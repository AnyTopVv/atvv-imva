package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * 视频
 * @author: zoy0
 * @date: 2023/10/29 13:32
 */
@Data
public class Video {
    /**
     * 视频id
     */
    private Long id;

    /**
     * 视频标题
     */
    private String videoName;

    /**
     * 文件路径
     */
    private String filePath;

    /**
     * 缩略图路径
     */
    private String previewPath;

    /**
     * 分区id
     */
    private Long categoryId;

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

}
