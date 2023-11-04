package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.UpLoadVideoDto;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/10/30 13:49
 */
public interface VideoService {

    /**
     * 获取推荐视频
     * @return
     */
    List<RecommendVideoVO> getRecommendVideo();

    /**
     * 上传视频
     * @param upLoadVideoDto
     */
    void uploadVideo(UpLoadVideoDto upLoadVideoDto);

    /**
     * 获取视频详情信息
     * @param videoId 视频id
     * @return
     */
    RecommendVideoVO getVideoDetailById(Long videoId);
}
