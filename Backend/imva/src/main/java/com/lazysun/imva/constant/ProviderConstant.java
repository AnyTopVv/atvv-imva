package com.lazysun.imva.constant;

import com.lazysun.imva.config.QiNiuConfig;
import com.lazysun.imva.config.SecureConfig;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @author: zoy0
 * @date: 2023/10/28 22:58
 */
@Component
public class ProviderConstant implements ApplicationContextAware {

    public static QiNiuConfig qiNiuConfig;

    public static SecureConfig secureConfig;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        qiNiuConfig = applicationContext.getBean(QiNiuConfig.class);
        secureConfig = applicationContext.getBean(SecureConfig.class);
    }
}
