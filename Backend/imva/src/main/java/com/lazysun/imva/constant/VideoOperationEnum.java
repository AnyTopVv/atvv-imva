package com.lazysun.imva.constant;

/**
 * @author: zoy0
 * @date: 2023/11/5 20:09
 */
public enum VideoOperationEnum {

    VIDEO_LIKE(1),
    VIDEO_UN_LIKE(2),
    VIDEO_STAR(3),
    VIDEO_UN_STAR(4)
    ;

    private final Integer code;

    public Integer getCode() {
        return code;
    }

    VideoOperationEnum(Integer code){
        this.code = code;
    }
}
