package com.lazysun.imva.constant;

/**
 * @author: zoy0
 * @date: 2023/11/3 15:32
 */
public class RedisConstant {

    /**
     * 通用过期时间： 30min
     */
    public static final long COMMON_EXPIRE_TIME = 60 * 30L;

    // 已上传的切片消息set前缀
    public static final String PART_INFOS_SET_KEY = "partInfosSet:";

    /**
     * 返回已上传的切片消息set的key值
     * @param uploadId 上传id
     * @return partInfosSet:uploadId
     */
    public static String getPartInfosSetKey(String uploadId){
        return PART_INFOS_SET_KEY + uploadId;
    }
}
