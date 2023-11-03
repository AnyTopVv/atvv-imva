package com.lazysun.imva.moudel.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 登录返回
 * @author: zoy0
 * @date: 2023/10/29 15:11
 */
@Data
@AllArgsConstructor
public class LoginRespVo {

    /**
     * 用户名
     */
    private String username;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 用户令牌
     */
    private String token;
}
