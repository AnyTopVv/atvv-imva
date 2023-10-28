package com.lazysun.imva.utils;

import com.lazysun.imva.config.QiNiuAuthPoolFactory;
import com.lazysun.imva.constant.ProviderConstant;
import com.qiniu.storage.DownloadUrl;
import com.qiniu.util.Auth;
import org.apache.commons.pool2.impl.GenericObjectPool;

/**
 * @author: zoy0
 * @date: 2023/10/28 22:28
 */
public class QiNiuUtil{

    private static final GenericObjectPool<Auth> QI_NIU_AUTH_POOL
            = new GenericObjectPool<>(new QiNiuAuthPoolFactory());

    public static String getDownloadUrl(String fileName,long expireInSeconds){
        Auth auth = null;
        try {
            auth = QI_NIU_AUTH_POOL.borrowObject();
            long deadline = System.currentTimeMillis()/1000 + expireInSeconds;
            DownloadUrl url = new DownloadUrl(ProviderConstant.qiNiuConfig.getCdnUrl(), false, fileName);
            return url.buildURL(auth, deadline);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            if (auth != null){
                QI_NIU_AUTH_POOL.returnObject(auth);
            }
        }
    }

}
