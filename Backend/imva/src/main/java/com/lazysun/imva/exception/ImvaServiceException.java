package com.lazysun.imva.exception;


import com.lazysun.imva.constant.ErrorCode;
import lombok.Data;

/**
 * @author: zoy0
 * @date: 2023/10/28 23:28
 */
@Data
public class ImvaServiceException extends RuntimeException{
    /**
     * 错误码
     */
    private Integer errorCode;

    /**
     * 错误信息
     */
    private String errorMessage;

    public ImvaServiceException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
    }

    public ImvaServiceException(ErrorCode errorCode) {
        super(errorCode.getMsg());
        this.errorMessage = errorCode.getMsg();
        this.errorCode = errorCode.getCode();
    }

    public ImvaServiceException(Integer errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

}
