package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/31 23:45
 */
@Data
public class UpLoadVideoDto {

    /**
     * 视频名字
     */
    private String videoName;

    /**
     * 分区id
     */
    private Long categoryId;

    /**
     * 文件md5
     */
    private String tVideoId;
}
