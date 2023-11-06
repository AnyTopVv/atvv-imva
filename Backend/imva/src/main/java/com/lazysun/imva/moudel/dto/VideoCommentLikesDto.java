package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/11/5 19:32
 */
@Data
public class VideoCommentLikesDto {

    /**
     * 评论id
     */
    private Long commentId;

    /**
     * 点赞 1为点赞，2为取消点赞
     */
    private Integer like;

}
