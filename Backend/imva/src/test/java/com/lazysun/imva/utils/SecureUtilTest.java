package com.lazysun.imva.utils;



import com.lazysun.imva.constant.ProviderConstant;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * @author: zoy0
 * @date: 2023/10/29 15:17
 */
@SpringBootTest
@ActiveProfiles("local")
class SecureUtilTest {

    private String encryptText = "nQJ84edaUtgWy7rHkT9daXnuRFXorKRHw+KGN/v2eH/0dNNFaNJQoQ07tgDGBoqdgBf099/M7XDxf7k4oAuIba87CkZaqikcwacvpqHnU2jBeJRibpLX+kXvJQ4mBeGbLbuscSrs7N79xb/jQRvIOC9DQMh3pf1+5nM+B+lqrJY=";

    @Test
    public void test(){
        boolean b = JwtUtil.verifyJwt("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTkyNzA0NTQsInVzZXJJZCI6M30.B7-D0LiiqxZWt8RXy6MQznb7WPl3jHEmUwOj-cgDcPU");
        System.out.println(b);
    }


    @Test
    void rsaDecrypt() {

    }





    @Test
    void md5Encrypt() {
        String s = SecureUtil.md5Encrypt("1234567bb");
        System.out.println(s.equals("8b4fffe7e403dfcef2b8c3c88c8102b5"));

    }
}