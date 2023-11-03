package com.lazysun.imva.moudel.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author: zoy0
 * @date: 2023/11/2 23:22
 */
@Data
@AllArgsConstructor
public class UploadDetailVO {

    private String uploadId;

    private Set<Integer> chunks;
}
