package com.lazysun.imva.moudel.vo;


import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/11/4 15:50
 */
@Data
@AllArgsConstructor
public class CategoryVo {
    /**
     * 分区id
     */
    private Long id;

    /**
     * 分区名
     */
    private String categoryName;
}
