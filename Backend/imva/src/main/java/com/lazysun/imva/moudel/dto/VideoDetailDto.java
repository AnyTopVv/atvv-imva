package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * 视频信息
 * @author: zoy0
 * @date: 2023/10/30 14:08
 */
@Data
public class VideoDetailDto {

    /**
     * video id
     */
    private Long id;

    /**
     * 视频标题
     */
    private String videoName;

    /**
     * 视频路径
     */
    private String filePath;

    /**
     * 视频缩略图路径
     */
    private String previewPath;

    /**
     * 作者id
     */
    private Long authorId;

    /**
     * 点赞数
     */
    private Integer like;

    /**
     * 收藏数
     */
    private Integer star;

    /**
     * 作者名
     */
    private String author;

    /**
     * 作者头像
     */
    private String authorAvatar;

    /**
     * 分区名
     */
    private String category;

}
