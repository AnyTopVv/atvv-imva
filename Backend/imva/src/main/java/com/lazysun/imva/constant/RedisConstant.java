package com.lazysun.imva.constant;

import java.util.Objects;

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

    // 推荐视频流对应的list前缀
    public static final String USER_RECOMMEND_VIDEO_KEY = "recommendVideo:";

    // 视频点赞用户的set 前缀
    public static final String VIDEO_LIKES_USER_SET_KEY = "videoLikesUser:";

    //视频收藏用户的set 前缀
    public static final String VIDEO_STARS_USER_SET_KEY = "videoStarsUser:";

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

    /**
     * 返回用户推荐视频id对于的list key
     * @param userId 用户id
     * @param categoryId 分区id
     * @return recommendVideo:userId:1:categoryId:1
     */
    public static String getUserRecommendVideIdKey(Long userId, Long categoryId){
        String key = USER_RECOMMEND_VIDEO_KEY + "userId:" + userId;
        if (Objects.nonNull(categoryId)){
            key += ":categoryId:"+categoryId;
        }
        return  key;
    }

    /**
     * 获取视频点赞用户的set key
     * @param videoId 视频id
     * @return videoLikesUser:videoId
     */
    public static String getVideoLikesUserSetKey(Long videoId){
        return VIDEO_LIKES_USER_SET_KEY + videoId;
    }

    /**
     * 获取视频收藏用户的set key
     * @param videoId 视频id
     * @return videoStarsUser:videoId
     */
    public static String getVideoStarsUserSetKey(Long videoId){
        return VIDEO_STARS_USER_SET_KEY + videoId;
    }
}
