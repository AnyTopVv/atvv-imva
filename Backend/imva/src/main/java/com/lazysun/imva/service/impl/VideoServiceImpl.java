package com.lazysun.imva.service.impl;


import com.lazysun.imva.dao.VideoDao;
import com.lazysun.imva.moudel.dto.VideoDetailDto;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.service.VideoService;
import com.lazysun.imva.utils.QiNiuUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/10/30 13:50
 */
@Service
public class VideoServiceImpl implements VideoService {

    @Resource
    private VideoDao videoDao;


    @Override
    public List<RecommendVideoVO> getRecommendVideo() {
        List<Long> videoIds = videoDao.getRandomIds(5);
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

}
