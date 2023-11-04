package com.lazysun.imva.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lazysun.imva.moudel.po.User;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: zoy0
 * @date: 2023/11/4 9:30
 */
public class JwtUtil {

    /**
     * 签名
     */
    private static final String SIGN="atvv";

    /**
     * 创建jwt
     * @param user 用户
     * @return jwt
     */
    public static String createJwt(User user) {
        //jwt 头部信息
        Map<String,Object> map=new HashMap<>();

        Calendar instance = Calendar.getInstance();
        // 6小时后令牌token失效
        instance.add(Calendar.HOUR,6);

        String token= JWT.create()
                .withHeader(map)
                .withClaim("userId",user.getId())
                .withExpiresAt(instance.getTime()) //过期时间
                .sign(Algorithm.HMAC256(SIGN));
        return  token;
    }

    public static boolean verifyJwt(String jwt){
        // 通过签名生成验证对象
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SIGN)).build();
        DecodedJWT verify = jwtVerifier.verify(jwt);
        return verify.getExpiresAt().before(new Date());
    }

    public static Long getLoginUserId(String jwt){
        // 通过签名生成验证对象
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SIGN)).build();
        DecodedJWT verify = jwtVerifier.verify(jwt);
        return verify.getClaim("userId").asLong();
    }

}
