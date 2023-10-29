package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/29 13:32
 */
@Data
public class Video {
    private Long id;

    private String videoName;

    private String filePath;

    private String previewPath;

    private Long categoryId;

    private Integer like;

    private Integer star;

}
