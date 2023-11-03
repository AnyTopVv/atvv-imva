package com.lazysun.imva.moudel.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

/**
 * 切片上传dto
 * @author: zoy0
 * @date: 2023/10/31 23:18
 */
@Data
public class FileChunksDto {

    /**
     * 分片索引
     */
    @NotBlank(message = "分片索引不能为空")
    private Integer index;

    /**
     * 上传id
     */
    @NotBlank(message = "上传id不能为空")
    private String uploadId;

    /**
     * 切片文件不能为空
     */
    @NotBlank(message = "切片文件不能为空")
    private MultipartFile file;

    /**
     * 总切片数
     */
    @NotBlank(message = "总切片数不能为空")
    private Integer totalChunk;
}
