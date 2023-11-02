package com.lazysun.imva.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.dao.TempUploadFileDao;
import com.lazysun.imva.dao.VideoDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.VideoDetailDto;
import com.lazysun.imva.moudel.po.TempUploadFile;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.service.VideoService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.qiniu.common.QiniuException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
    public List<RecommendVideoVO> getRecommendVideo() {
        List<Long> videoIds = videoDao.getRamdomIds(5);
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
    public String findUploadIdByMD5(String md5, String fileExtension) {
        Long userId = (Long)StpUtil.getLoginId();
        String uploadId = tempUploadFileDao.findUploadIdByMD5(md5, userId);
        if (Objects.isNull(uploadId)){
            String fileName = UUID.randomUUID() + "." + fileExtension;
            try {
                uploadId = QiNiuUtil.getUploadId("video/video/", fileName);
            } catch (QiniuException e) {
                throw new ImvaServiceException(ErrorCode.ERROR);
            }
            tempUploadFileDao.insert(new TempUploadFile());
        }
        return uploadId;
    }
}
