package com.lazysun.imva.utils;

import com.lazysun.imva.config.SingletonAuth;
import com.lazysun.imva.constant.ProviderConstant;
import com.qiniu.common.QiniuException;
import com.qiniu.storage.DownloadUrl;
import com.qiniu.util.Auth;

/**
 * @author: zoy0
 * @date: 2023/10/28 22:28
 */
public class QiNiuUtil {

    /**
     * 获取cdn下载链接
     * @param fileName 文件路径
     * @param expireInSeconds 过期时间
     * @return
     */
    public static String getDownloadUrl(String fileName, Long expireInSeconds) {
        if (expireInSeconds == null) {
            expireInSeconds = 3600L;
        }
        Auth auth = SingletonAuth.getInstance();
        long deadline = System.currentTimeMillis() / 1000 + expireInSeconds;
        DownloadUrl url = new DownloadUrl(ProviderConstant.qiNiuConfig.getCdnUrl(), false, fileName);
        try {
            return url.buildURL(auth, deadline);
        } catch (QiniuException e) {
            throw new RuntimeException(e);
        }
    }

}
