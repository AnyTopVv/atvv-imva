package com.lazysun.imva.moudel.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:11
 */
@Data
@AllArgsConstructor
public class LoginRespVo {

    private String username;

    private String avatar;

    private String token;
}
