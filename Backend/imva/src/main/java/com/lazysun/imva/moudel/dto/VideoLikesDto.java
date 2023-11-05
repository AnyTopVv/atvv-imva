package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/11/5 19:32
 */
@Data
public class VideoLikesDto {

    /**
     * 视频id
     */
    private Long videoId;

    /**
     * 点赞 1为点赞，2为取消点赞
     */
    private Integer like;

}
