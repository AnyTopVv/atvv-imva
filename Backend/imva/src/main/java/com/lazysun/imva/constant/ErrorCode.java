package com.lazysun.imva.constant;

/**
 * http返回码
 * @author: zoy0
 * @date: 2023/10/28 23:24
 */
public enum ErrorCode {

    // 系统模块
    SUCCESS(0, "操作成功"),
    ERROR(1, "操作失败"),
    SERVER_ERROR(500, "服务器异常"),

    // 用户模块
    NO_USER(10001,"用户不存在"),
    ERROR_PASSWORD(10002,"用户密码错误"),
    DUPLICATE_USERNAME(10011,"用户名重复"),

    ;
    private final Integer code;

    private final String msg;

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
