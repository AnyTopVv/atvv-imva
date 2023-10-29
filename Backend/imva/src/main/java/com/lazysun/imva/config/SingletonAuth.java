package com.lazysun.imva.config;

import com.lazysun.imva.constant.ProviderConstant;
import com.qiniu.util.Auth;

/**
 * @author: zoy0
 * @date: 2023/10/29 9:23
 */
public class SingletonAuth {
    private static final Auth INSTANCE = Auth.create(ProviderConstant.qiNiuConfig.getAccessKey(), ProviderConstant.qiNiuConfig.getSecretKey());
    private SingletonAuth (){}
    public static Auth getInstance() {
        return INSTANCE;
    }
}
