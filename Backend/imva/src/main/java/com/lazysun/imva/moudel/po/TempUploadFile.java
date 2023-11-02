package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/11/2 21:32
 */
@Data
public class TempUploadFile {
    private Long id;

    private String uploadId;

    private String md5;

    private Long userId;

    private String fileName;

    private Long enable;
}
