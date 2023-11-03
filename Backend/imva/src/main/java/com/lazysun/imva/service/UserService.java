package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.LoginDto;
import com.lazysun.imva.moudel.dto.RegisterDto;
import com.lazysun.imva.moudel.vo.LoginRespVo;

/**
 * 用户逻辑层
 * @author: zoy0
 * @date: 2023/10/29 15:09
 */
public interface UserService {
    /**
     * 登录
     * @param loginDto
     * @return
     */
    LoginRespVo doLogin(LoginDto loginDto);

    /**
     * 注册
     * @param registerDto
     */
    void doRegister(RegisterDto registerDto);
}
