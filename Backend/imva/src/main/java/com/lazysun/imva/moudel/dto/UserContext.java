package com.lazysun.imva.moudel.dto;

/**
 * @author: zoy0
 * @date: 2023/11/4 10:00
 */
public class UserContext {

    private static final ThreadLocal<Long> USER = new ThreadLocal<>();

    private UserContext() {
    }

    public static Long getUserId() {
        return USER.get();
    }


    public static void setUserId(Long id) {
        USER.set(id);
    }

    public static void remove() {
        USER.remove();
    }
}
