package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:48
 */
@Mapper
public interface CommentDao {

    Integer insert(Comment comment);

    List<Comment> pageListCount();


}
