package com.lazysun.imva.moudel.po;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 视频点赞
 * @author: zoy0
 * @date: 2023/11/5 13:42
 */
@Data
@NoArgsConstructor
public class VideoLikes {
    /**
     * 主键
     */
    private Long id;

    /**
     * 视频id
     */
    private Long videoId;

    /**
     * 用户id
     */
    private Long userId;

    public VideoLikes(Long videoId, Long userId) {
        this.videoId = videoId;
        this.userId = userId;
    }
}
