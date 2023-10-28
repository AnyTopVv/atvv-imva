package com.lazysun.imva.config;


import com.lazysun.imva.utils.QiNiuUtil;
import lombok.Data;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @author: zoy0
 * @date: 2023/10/28 21:00
 */
@Data
@Component
@ConfigurationProperties(prefix = "qiniu")
public class QiNiuConfig{

    private String accessKey;

    private String secretKey;

    private String bucket;

    private String cdnUrl;
}
