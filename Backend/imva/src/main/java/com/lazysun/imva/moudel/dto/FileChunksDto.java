package com.lazysun.imva.moudel.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author: zoy0
 * @date: 2023/10/31 23:18
 */
@Data
public class FileChunksDto {

    private Integer index;

    private String uploadId;

    private MultipartFile file;

    private Integer totalChunk;
}
