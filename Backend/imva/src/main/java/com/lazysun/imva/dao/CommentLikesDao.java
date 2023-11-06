package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.CommentLikes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


/**
 * @author: zoy0
 * @date: 2023/11/6 16:51
 */
@Mapper
public interface CommentLikesDao {
    /**
     * 插入
     * @param commentLikes 实体类
     * @return
     */
    int insert(CommentLikes commentLikes);

    /**
     * 删除
     * @param userId 用户id
     * @param commentId 视频id
     * @return
     */
    int delete(@Param("userId") Long userId, @Param("commentId") Long commentId);

    /**
     * 统计视频的点赞数
     * @param commentId 视频id
     * @return 点赞数
     */
    int count(@Param("commentId") Long commentId);

}
