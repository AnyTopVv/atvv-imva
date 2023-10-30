package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/30 14:08
 */
@Data
public class VideoDetailDto {

    private Long id;

    private String videoName;

    private String filePath;

    private String previewPath;

    private Long authorId;

    private Integer like;

    private Integer star;

    private String author;

    private String authorAvatar;

    private String category;

}
