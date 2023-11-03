package com.lazysun.imva.utils;

import cn.dev33.satoken.secure.SaBase64Util;
import cn.dev33.satoken.secure.SaSecureUtil;
import com.lazysun.imva.constant.ProviderConstant;
import com.lazysun.imva.exception.ImvaServiceException;

import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:14
 */
public class SecureUtil {

    private static final String RSA_PUBLIC_KEY = ProviderConstant.secureConfig.getPublicKey();

    private static final String RSA_PRIVATE_KEY = ProviderConstant.secureConfig.getPrivateKey();

    /**
     * rsa解密
     * @param text 密文
     * @return
     */
    public static String rsaDecrypt(String text){
        try {
            return decrypt(text, RSA_PRIVATE_KEY);
        } catch (Exception e) {
            throw new ImvaServiceException("解密失败");
        }
    }

    /**
     * md5 加密
     * @param text
     * @return
     */
    public static String md5Encrypt(String text){
        return SaSecureUtil.md5(text);
    }

    /**
     * 私钥解密
     *
     * @param secretText    待解密的密文字符串
     * @param privateKeyStr 私钥
     * @return 解密后的明文
     */
    private static String decrypt(String secretText, String privateKeyStr) throws Exception {
            // 生成私钥
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, getPrivateKey(privateKeyStr));
            // 密文解码
            byte[] secretTextDecoded = Base64.getDecoder().decode(secretText.getBytes(StandardCharsets.UTF_8));
            byte[] tempBytes = cipher.doFinal(secretTextDecoded);
            return new String(tempBytes);
    }

    private static PrivateKey getPrivateKey(String privateKeyString) throws Exception {
        byte[] privateKeyByte = Base64.getDecoder().decode(privateKeyString);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKeyByte);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }

}
