package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * 用户
 * @author: zoy0
 * @date: 2023/10/29 13:30
 */
@Data
public class User {
    /**
     * 用户id
     */
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 用户密码
     */
    private String password;

    /**
     * 用户状态
     */
    private Integer status;

    /**
     * 头像
     */
    private String avatar;
}
