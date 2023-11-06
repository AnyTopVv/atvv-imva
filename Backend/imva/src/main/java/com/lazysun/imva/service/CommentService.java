package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.AddVideoCommentDto;
import com.lazysun.imva.moudel.dto.VideoCommentLikesDto;
import com.lazysun.imva.moudel.vo.VideoCommentVo;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:57
 */
public interface CommentService {
    void addComment(AddVideoCommentDto addVideoCommentDto);

    VideoCommentVo listCommentPage(Long videoId, Integer pageNumber);

    void commentLikesOperate(VideoCommentLikesDto videoCommentLikesDto);
}
