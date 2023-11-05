package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.VideoLikes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/11/5 16:15
 */
@Mapper
public interface VideoStarsDao {
    /**
     * 插入
     * @param videoLikes 实体类
     * @return
     */
    int insert(VideoLikes videoLikes);

    /**
     * 删除
     * @param userId 用户id
     * @param videoId 视频id
     * @return
     */
    int delete(@Param("userId") Long userId, @Param("videoId") Long videoId);

    /**
     * 统计视频的收藏数
     * @param videoId 视频id
     * @return 点赞数
     */
    int count(@Param("videoId") Long videoId);

    /**
     * 获取一个视频的所有收藏用户
     * @param videoId 视频id
     * @return 点赞用户id
     */
    List<Long> getVideoStarsUserId(@Param("videoId") Long videoId);

    /**
     * 判断用户是否收藏
     * @param userId 用户id
     * @param videoId 视频id
     * @return
     */
    Long isStar(@Param("userId") Long userId, @Param("videoId") Long videoId);
}
