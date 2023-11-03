package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.LoginDto;
import com.lazysun.imva.moudel.dto.RegisterDto;
import com.lazysun.imva.moudel.vo.LoginRespVo;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/10/29 13:38
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 登录
     * @param loginDto
     * @return
     */
    @PostMapping("/login")
    public ResponseVO<LoginRespVo> login(@RequestBody LoginDto loginDto){
        return ResponseVO.success(userService.doLogin(loginDto));
    }

    /**
     * 注册
     * @param registerDto
     * @return
     */
    @PostMapping("/register")
    public ResponseVO<LoginRespVo> register(@RequestBody RegisterDto registerDto){
        userService.doRegister(registerDto);
        return ResponseVO.success();
    }
}
