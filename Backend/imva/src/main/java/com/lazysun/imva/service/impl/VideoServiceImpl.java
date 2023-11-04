package com.lazysun.imva.service.impl;


import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.constant.FileConstant;
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
import com.qiniu.common.QiniuException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

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
    public List<RecommendVideoVO> getRecommendVideo(Long categoryId) {
        //获取随机id
        List<Long> videoIds = videoDao.getRandomIds(5,categoryId);
        if (videoIds.isEmpty()) {
            throw new ImvaServiceException(ErrorCode.VIDEO_NOT_FOUND);
        }
        List<VideoDetailDto> videos = videoDao.findByIds(videoIds);
        List<RecommendVideoVO> list = new ArrayList<>();
        for (VideoDetailDto video : videos) {
            RecommendVideoVO recommendVideoVO = RecommendVideoVO.build(video);
            //TODO 头像和和缩略图不必放在私有空间
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
        String tempVideoPath = FileConstant.TEMP_FILE_VIDEO_PATH + "/" + tempUploadFile.getFileName() + tempUploadFile.getFileExtension(),
                videoPath = FileConstant.FILE_VIDEO_PATH + "/" + tempUploadFile.getFileName() + tempUploadFile.getFileExtension(),
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
        List<VideoDetailDto> videoDetailDtoList = videoDao.findByIds(Collections.singletonList(videoId));
        if (videoDetailDtoList.isEmpty()){
            throw new ImvaServiceException(ErrorCode.VIDEO_NOT_FOUND);
        }
        VideoDetailDto video = videoDetailDtoList.get(0);
        RecommendVideoVO videoVO = RecommendVideoVO.build(video);
        videoVO.setVideoPreview(QiNiuUtil.getDownloadUrl(video.getPreviewPath(), null));
        videoVO.setVideoSrc(QiNiuUtil.getDownloadUrl(video.getFilePath(), null));
        videoVO.setAuthorAvatarSrc(QiNiuUtil.getDownloadUrl(video.getAuthorAvatar(), null));
        return videoVO;
    }

}
