package com.lazysun.imva.moudel.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 注册dto
 * @author: zoy0
 * @date: 2023/10/29 15:47
 */
@Data
public class RegisterDto {

    /**
     * 用户名
     */
    @NotBlank(message = "用户名不能为空")
    private String username;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空")
    private String password;
}
