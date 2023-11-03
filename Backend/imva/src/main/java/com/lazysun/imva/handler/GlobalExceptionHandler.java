package com.lazysun.imva.handler;

import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.vo.ResponseVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

/**
 * @author: zoy0
 * @date: 2023/10/28 23:27
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ImvaServiceException.class)
    public ResponseVO<?> serviceException(ImvaServiceException userServiceException){
        return new ResponseVO<>(userServiceException.getErrorCode(),userServiceException.getErrorMessage());
    }

    @ExceptionHandler(BindException.class)
    public ResponseVO<?> bindException(BindException bindException){
        return new ResponseVO<>(ErrorCode.BAD_REQUEST.getCode(),bindException.getAllErrors().stream().map(ObjectError::getDefaultMessage)
                .collect(Collectors.joining(",")));
    }

    @ExceptionHandler(Exception.class)
    public ResponseVO<?> exception(Exception exception){
        log.error("发生未知错误",exception);
        return ResponseVO.failure(ErrorCode.ERROR);
    }


}
