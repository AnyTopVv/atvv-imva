package com.lazysun.imva.interceptor;

import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.utils.JwtUtil;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

/**
 * @author: zoy0
 * @date: 2023/11/4 22:25
 */
public class UserInfoInterceptor implements HandlerInterceptor {

    /***
     * 在请求处理之前进行调用
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String jwt = request.getHeader("authorization");
        if (Objects.isNull(jwt)) {
            return true;
        }
        Long userId;
        try {
            userId = JwtUtil.getLoginUserId(jwt);
        } catch (Exception e) {
            return true;
        }
        UserContext.setUserId(userId);
        return true;
    }

    /***
     * 请求处理之后进行调用
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserContext.remove();
    }
}
