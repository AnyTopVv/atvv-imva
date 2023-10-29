package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.LoginDto;
import com.lazysun.imva.moudel.dto.RegisterDto;
import com.lazysun.imva.moudel.vo.LoginRespVo;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:09
 */
public interface UserService {
    LoginRespVo doLogin(LoginDto loginDto);

    void doRegister(RegisterDto registerDto);
}
