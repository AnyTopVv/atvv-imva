package com.lazysun.imva.service.impl;

import com.lazysun.imva.constant.RedisConstant;
import com.lazysun.imva.constant.VideoOperationEnum;
import com.lazysun.imva.dao.VideoStarsDao;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.dto.VideoStarsDto;
import com.lazysun.imva.moudel.po.VideoLikes;
import com.lazysun.imva.service.VideoStarsService;
import com.lazysun.imva.utils.RedisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/11/5 20:18
 */
@Service
public class VideoStarsServiceImpl implements VideoStarsService {

    @Resource
    private VideoStarsDao videoStarsDao;

    @Override
    public void operate(VideoStarsDto videoStarsDto) {
        Long userId = UserContext.getUserId();
        // TODO mq异步落库，削蜂
        if (VideoOperationEnum.VIDEO_STAR.getCode().equals(videoStarsDto.getStar())) {
            RedisUtil.sSet(RedisConstant.getVideoStarsUserSetKey(videoStarsDto.getVideoId()),userId);
            videoStarsDao.insert(new VideoLikes(videoStarsDto.getVideoId(), userId));
        } else if (VideoOperationEnum.VIDEO_UN_STAR.getCode().equals(videoStarsDto.getStar())) {
            RedisUtil.setRemove(RedisConstant.getVideoStarsUserSetKey(videoStarsDto.getVideoId()),userId);
            videoStarsDao.delete(userId, videoStarsDto.getVideoId());
        }
    }
}
