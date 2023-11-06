package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.AddVideoCommentDto;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:57
 */
public interface CommentService {
    void addComment(AddVideoCommentDto addVideoCommentDto);
}
