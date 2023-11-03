package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * redis存储切片信息dto
 * @author: zoy0
 * @date: 2023/10/31 10:26
 */
@Data
public class PartInfo {
    /**
     * 切片索引
     */
    private Integer partNumber;

    /**
     * 切片标识符
     */
    private String etag;

    /**
     * 切片文件md5
     */
    private String md5;
}
