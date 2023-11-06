package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:48
 */
@Mapper
public interface CommentDao {

    Integer insert(Comment comment);

    /**
     *
     * @param videoId 视频id
     * @param offset 偏移量
     * @param pageSize 页码
     * @return
     */
    List<Comment> pageList(@Param("videoId") Long videoId, @Param("offset") Integer offset, @Param("pageSize") Integer pageSize);

    /**
     *
     * @param videoId 视频id
     * @return
     */
    Integer pageListCount(@Param("videoId") Long videoId);
}
