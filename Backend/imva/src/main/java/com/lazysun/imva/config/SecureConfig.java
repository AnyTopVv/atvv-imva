package com.lazysun.imva.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:23
 */
@Data
@Component
@ConfigurationProperties(prefix = "secure")
public class SecureConfig {

    private String publicKey;

    private String privateKey;
}
