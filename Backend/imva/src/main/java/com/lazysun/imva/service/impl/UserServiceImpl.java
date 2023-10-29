package com.lazysun.imva.service.impl;

import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.dao.UserDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.LoginDto;
import com.lazysun.imva.moudel.dto.RegisterDto;
import com.lazysun.imva.moudel.po.User;
import com.lazysun.imva.moudel.vo.LoginRespVo;
import com.lazysun.imva.service.UserService;
import com.lazysun.imva.utils.SecureUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Objects;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:10
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;

    @Override
    public LoginRespVo doLogin(LoginDto loginDto) {
        User user = userDao.findByUserName(loginDto.getUsername());
        if (Objects.isNull(user)) {
            throw new ImvaServiceException(ErrorCode.NO_USER);
        } else if (!user.getPassword().equals(SecureUtil.md5Encrypt(SecureUtil.rsaDecrypt(loginDto.getPassword())))) {
            throw new ImvaServiceException(ErrorCode.ERROR_PASSWORD);
        }
        StpUtil.login(user.getId());
        SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
        return new LoginRespVo(user.getUsername(), user.getAvatar(), tokenInfo.tokenValue);
    }

    @Override
    public void doRegister(RegisterDto registerDto) {
        User user = userDao.findByUserName(registerDto.getUsername());
        if (Objects.nonNull(user)){
            throw new ImvaServiceException(ErrorCode.DUPLICATE_USERNAME);
        }
        user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(SecureUtil.md5Encrypt(SecureUtil.rsaDecrypt(registerDto.getPassword())));
        userDao.insert(user);
    }
}
