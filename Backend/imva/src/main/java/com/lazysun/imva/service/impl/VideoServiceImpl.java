package com.lazysun.imva.service.impl;


import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.constant.FileConstant;
import com.lazysun.imva.constant.RedisConstant;
import com.lazysun.imva.dao.TempUploadFileDao;
import com.lazysun.imva.dao.VideoDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.UpLoadVideoDto;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.dto.VideoDetailDto;
import com.lazysun.imva.moudel.po.TempUploadFile;
import com.lazysun.imva.moudel.po.Video;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.service.VideoService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.lazysun.imva.utils.RedisUtil;
import com.qiniu.common.QiniuException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author: zoy0
 * @date: 2023/10/30 13:50
 */
@Service
public class VideoServiceImpl implements VideoService {

    @Resource
    private VideoDao videoDao;

    @Resource
    private TempUploadFileDao tempUploadFileDao;


    @Override
    public List<RecommendVideoVO> getRecommendVideo(Long categoryId, int count) {
        //获取随机id
        Long userId = UserContext.getUserId();
        List<Long> videoIdsList = RedisUtil.lGet(RedisConstant.getUserRecommendVideIdKey(Objects.isNull(userId) ? 0 : userId, categoryId), count).stream().map(o -> Long.valueOf(o.toString())).collect(Collectors.toList());
        if (videoIdsList.isEmpty()) {
            List<Long> videoIds;
            if (videoDao.count(categoryId) < count + 25) {
                videoIds = videoDao.getAllIds(categoryId);
            } else {
                videoIds = videoDao.getRandomIds(25 + count, categoryId);
            }
            Collections.shuffle(videoIds);
            videoIdsList = videoIds.stream().limit(count).collect(Collectors.toList());
            if (videoIds.size() > count) {
                RedisUtil.lSet(RedisConstant.getUserRecommendVideIdKey(Objects.isNull(userId) ? 0 : userId, categoryId), Arrays.asList(videoIds.subList(count, videoIds.size() - 1).toArray()), RedisConstant.COMMON_EXPIRE_TIME);
            }
        }
        if (videoIdsList.isEmpty()) {
            throw new ImvaServiceException(ErrorCode.VIDEO_NOT_FOUND);
        }
        List<VideoDetailDto> videos = videoDao.findByIds(videoIdsList);
        List<RecommendVideoVO> list = new ArrayList<>();
        for (VideoDetailDto video : videos) {
            RecommendVideoVO recommendVideoVO = RecommendVideoVO.build(video);
            recommendVideoVO.setLikes((int) RedisUtil.sGetSetSize(RedisConstant.getVideoLikesUserSetKey(video.getId())));
            recommendVideoVO.setStars((int) RedisUtil.sGetSetSize(RedisConstant.getVideoStarsUserSetKey(video.getId())));
            //TODO 头像和和缩略图不必放在私有空间
            if (Objects.nonNull(userId)) {
                if (RedisUtil.setHasKey(RedisConstant.getVideoLikesUserSetKey(video.getId()), userId)) {
                    recommendVideoVO.setUserLike(1);
                }
                if (RedisUtil.setHasKey(RedisConstant.getVideoStarsUserSetKey(video.getId()), userId)) {
                    recommendVideoVO.setUserStar(1);
                }
            }
            recommendVideoVO.setVideoPreview(QiNiuUtil.getDownloadUrl(video.getPreviewPath(), null));
            recommendVideoVO.setVideoSrc(QiNiuUtil.getDownloadUrl(video.getFilePath(), null));
            recommendVideoVO.setAuthorAvatarSrc(QiNiuUtil.getDownloadUrl(video.getAuthorAvatar(), null));
            list.add(recommendVideoVO);
        }
        return list;
    }

    @Override
    public void uploadVideo(UpLoadVideoDto upLoadVideoDto) {
        Long userId = UserContext.getUserId();
        TempUploadFile tempUploadFile = tempUploadFileDao.getFileInfoByMD5(upLoadVideoDto.getMd5(), userId);
        String tempVideoPath = FileConstant.TEMP_FILE_VIDEO_PATH + "/" + tempUploadFile.getFileName() + "." + tempUploadFile.getFileExtension(),
                videoPath = FileConstant.FILE_VIDEO_PATH + "/" + tempUploadFile.getFileName() + "." + tempUploadFile.getFileExtension(),
                tempPreviewPath = FileConstant.TEMP_FILE_PREVIEW_PATH + "/" + FileConstant.getFilePreviewPath(tempUploadFile.getFileName()),
                previewPath = FileConstant.FILE_PREVIEW_PATH + "/" + FileConstant.getFilePreviewPath(tempUploadFile.getFileName());
        try {
            //将文件从临时文件夹移动至视频文件夹下
            QiNiuUtil.moveFile(tempVideoPath, videoPath);
            QiNiuUtil.moveFile(tempPreviewPath, previewPath);
        } catch (QiniuException e) {
            e.printStackTrace();
            throw new ImvaServiceException(ErrorCode.ERROR);
        }
        Video video = new Video();
        video.setVideoName(upLoadVideoDto.getVideoName());
        video.setAuthorId(userId);
        video.setCategoryId(upLoadVideoDto.getCategoryId());
        video.setFilePath(videoPath);
        video.setPreviewPath(previewPath);
        video.setLike(0);
        video.setStar(0);
        videoDao.insert(video);
    }

    @Override
    public RecommendVideoVO getVideoDetailById(Long videoId) {
        Long userId = UserContext.getUserId();
        List<VideoDetailDto> videoDetailDtoList = videoDao.findByIds(Collections.singletonList(videoId));
        if (videoDetailDtoList.isEmpty()) {
            throw new ImvaServiceException(ErrorCode.VIDEO_NOT_FOUND);
        }
        VideoDetailDto video = videoDetailDtoList.get(0);
        RecommendVideoVO videoVO = RecommendVideoVO.build(video);
        videoVO.setLikes((int) RedisUtil.sGetSetSize(RedisConstant.getVideoLikesUserSetKey(video.getId())));
        videoVO.setStars((int) RedisUtil.sGetSetSize(RedisConstant.getVideoStarsUserSetKey(video.getId())));
        if (Objects.nonNull(userId)) {
            if (RedisUtil.setHasKey(RedisConstant.getVideoLikesUserSetKey(video.getId()), userId)) {
                videoVO.setUserLike(1);
            }
            if (RedisUtil.setHasKey(RedisConstant.getVideoStarsUserSetKey(video.getId()), userId)) {
                videoVO.setUserStar(1);
            }
        }
        videoVO.setVideoPreview(QiNiuUtil.getDownloadUrl(video.getPreviewPath(), null));
        videoVO.setVideoSrc(QiNiuUtil.getDownloadUrl(video.getFilePath(), null));
        videoVO.setAuthorAvatarSrc(QiNiuUtil.getDownloadUrl(video.getAuthorAvatar(), null));
        return videoVO;
    }

}
