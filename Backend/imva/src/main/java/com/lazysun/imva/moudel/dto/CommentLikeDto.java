package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:43
 */
@Data
public class CommentLikeDto {

    private Long videoId;

    /**
     * 1为点赞 , 2为取消点赞
     */
    private Integer like;
}
