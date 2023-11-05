package com.lazysun.imva.moudel.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: zoy0
 * @date: 2023/11/5 19:42
 */
@Data
@NoArgsConstructor
public class VideoStarsDto {

    /**
     * 视频id
     */
    private Long videoId;

    /**
     * 收藏 3为收藏，4为取消收藏
     */
    private Integer star;
}
