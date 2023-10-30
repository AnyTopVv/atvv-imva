package com.lazysun.imva;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
@ActiveProfiles("local")
class ImvaApplicationTests {

    @Resource
    private RedisTemplate<String,Long> redisTemplate;

    @Test
    void contextLoads() {

    }

}
