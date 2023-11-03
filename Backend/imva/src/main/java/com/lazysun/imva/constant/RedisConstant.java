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

    public static final long TWO_HOUR_TIME = 60 * 60 * 2L;

    // 已上传的切片消息set前缀
    public static final String PART_INFOS_SET_KEY = "partInfosSet:";

    // 请求的uploadId对应的hash前缀
    public static final String UPLOAD_ID_KEY = "uploadId:";

    /**
     * 返回已上传的切片消息set的key值
     * @param uploadId 上传id
     * @return partInfosSet:uploadId
     */
    public static String getPartInfosSetKey(String uploadId){
        return PART_INFOS_SET_KEY + uploadId;
    }

    /**
     * 返回请求的uploadId对应的hash key
     * @param uploadId 上传id
     * @return uploadId:uploadId
     */
    public static String getUploadIdKey(String uploadId){
        return UPLOAD_ID_KEY + uploadId;
    }
}
