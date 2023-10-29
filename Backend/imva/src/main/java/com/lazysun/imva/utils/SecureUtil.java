package com.lazysun.imva.utils;

import cn.dev33.satoken.secure.SaSecureUtil;
import com.lazysun.imva.constant.ProviderConstant;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:14
 */
public class SecureUtil {

    private static final String RSA_PUBLIC_KEY = ProviderConstant.secureConfig.getPublicKey();

    private static final String RSA_PRIVATE_KEY = ProviderConstant.secureConfig.getPrivateKey();

    public static String rsaDecrypt(String text){
        return SaSecureUtil.rsaDecryptByPrivate(RSA_PRIVATE_KEY, text);
    }

    public static String md5Encrypt(String text){
        return SaSecureUtil.md5(text);
    }

}
