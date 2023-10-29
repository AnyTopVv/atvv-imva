package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/29 13:30
 */
@Data
public class User {
    private Long id;

    private String username;

    private String password;

    private Integer status;

    private String avatar;
}
