package com.lazysun.imva.service.impl;

import com.lazysun.imva.constant.CommonConstant;
import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.dao.UserDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.LoginDto;
import com.lazysun.imva.moudel.dto.RegisterDto;
import com.lazysun.imva.moudel.po.User;
import com.lazysun.imva.moudel.vo.LoginRespVo;
import com.lazysun.imva.service.UserService;
import com.lazysun.imva.utils.JwtUtil;
import com.lazysun.imva.utils.QiNiuUtil;
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
        String jwt = JwtUtil.createJwt(user);
        String avatarUrl = QiNiuUtil.getDownloadUrl(user.getAvatar(), null);
        return new LoginRespVo(user.getUsername(), avatarUrl, jwt);
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
        user.setStatus(1);
        user.setAvatar(CommonConstant.DEFAULT_AVATAR);
        userDao.insert(user);
    }
}
