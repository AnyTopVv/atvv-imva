package com.lazysun.imva.service.impl;

import com.lazysun.imva.constant.RedisConstant;
import com.lazysun.imva.constant.VideoOperationEnum;
import com.lazysun.imva.dao.VideoLikesDao;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.dto.VideoLikesDto;
import com.lazysun.imva.moudel.po.VideoLikes;
import com.lazysun.imva.service.VideoLikesService;
import com.lazysun.imva.utils.RedisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/11/5 19:44
 */
@Service
public class VideoLikesServiceImpl implements VideoLikesService {

    @Resource
    private VideoLikesDao videoLikesDao;


    @Override
    public void operate(VideoLikesDto videoLikesDto) {
        Long userId = UserContext.getUserId();
        // TODO mq异步落库，削蜂
        if (VideoOperationEnum.VIDEO_LIKE.getCode().equals(videoLikesDto.getLike())) {
            RedisUtil.sSet(RedisConstant.getVideoLikesUserSetKey(videoLikesDto.getVideoId()),userId);
            videoLikesDao.insert(new VideoLikes(videoLikesDto.getVideoId(), userId));
        } else if (VideoOperationEnum.VIDEO_UN_LIKE.getCode().equals(videoLikesDto.getLike())) {
            RedisUtil.setRemove(RedisConstant.getVideoLikesUserSetKey(videoLikesDto.getVideoId()),userId);
            videoLikesDao.delete(userId, videoLikesDto.getVideoId());
        }
    }
}
