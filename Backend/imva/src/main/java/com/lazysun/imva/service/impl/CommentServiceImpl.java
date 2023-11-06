package com.lazysun.imva.service.impl;

import com.lazysun.imva.dao.CommentDao;
import com.lazysun.imva.dao.CommentLikesDao;
import com.lazysun.imva.moudel.dto.AddVideoCommentDto;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.po.Comment;
import com.lazysun.imva.service.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:57
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Resource
    private CommentLikesDao commentLikesDao;

    @Resource
    private CommentDao commentDao;

    @Override
    public void addComment(AddVideoCommentDto addVideoCommentDto) {
        Long userId = UserContext.getUserId();
        Comment comment = new Comment();
        comment.setCommentContent(addVideoCommentDto.getCommentContent());
        comment.setUserId(userId);
        comment.setEnable(0L);
        comment.setLikes(0);
        comment.setVideoId(addVideoCommentDto.getVideoId());
        comment.setCreateTime(new Date());
        commentDao.insert(comment);
    }
}
