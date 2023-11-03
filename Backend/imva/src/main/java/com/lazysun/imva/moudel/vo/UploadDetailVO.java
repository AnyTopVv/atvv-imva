package com.lazysun.imva.moudel.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * 上传id回复
 * @author: zoy0
 * @date: 2023/11/2 23:22
 */
@Data
@AllArgsConstructor
public class UploadDetailVO {

    /**
     * 上传id
     */
    private String uploadId;

    /**
     * 已上传切片
     */
    private Set<Integer> chunks;
}
