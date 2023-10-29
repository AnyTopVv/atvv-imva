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
