package com.lazysun.imva.moudel.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 视频上传dto
 * @author: zoy0
 * @date: 2023/10/31 23:45
 */
@Data
public class UpLoadVideoDto {

    /**
     * 视频名字
     */
    @NotBlank(message = "视频名字不能为空")
    private String videoName;

    /**
     * 分区id
     */
    @NotBlank(message = "分区id不能为空")
    private Long categoryId;

    /**
     * 文件md5
     */
    @NotBlank(message = "文件md5不能为空")
    private String md5;
}
