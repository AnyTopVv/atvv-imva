package com.lazysun.imva.interceptor;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.utils.JwtUtil;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

/**
 * @author: zoy0
 * @date: 2023/11/4 9:50
 */
public class UserLoginInterceptor implements HandlerInterceptor {
    /***
     * 在请求处理之前进行调用
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String jwt = request.getHeader("authorization");
        if (Objects.isNull(jwt)){
            throw new ImvaServiceException(ErrorCode.NOT_LOGIN);
        }
        try {
            JwtUtil.verifyJwt(jwt);
        } catch (TokenExpiredException e) {
            throw new ImvaServiceException(ErrorCode.JWT_EXPIRE);
        } catch (Exception e){
            throw new ImvaServiceException(ErrorCode.JWT_ERROR);
        }
        return true;
    }


}
