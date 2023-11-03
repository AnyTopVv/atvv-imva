package com.lazysun.imva.moudel.vo;

import com.lazysun.imva.moudel.dto.VideoDetailDto;
import lombok.Data;

import java.util.UUID;

/**
 * 推荐视频返回
 * @author: zoy0
 * @date: 2023/10/28 23:30
 */
@Data
public class RecommendVideoVO {

    /**
     * 视频url
     */
    private String videoSrc;

    /**
     * 缩略图url
     */
    private String videoPreview;

    /**
     * 作者头像url
     */
    private String authorAvatarSrc;

    /**
     * 作者名
     */
    private String author;

    /**
     * 视频标题
     */
    private String title;

    /**
     * 分区
     */
    private String category;

    /**
     * 视频id
     */
    private Long uuid;

    /**
     * 点赞数
     */
    private Integer likes;

    /**
     * 收藏数
     */
    private Integer stars;

    public static RecommendVideoVO build(VideoDetailDto video) {
        RecommendVideoVO recommendVideoVO = new RecommendVideoVO();
        recommendVideoVO.setUuid(video.getId());
        recommendVideoVO.setCategory(video.getCategory());
        recommendVideoVO.setAuthor(video.getAuthor());
        recommendVideoVO.setStars(video.getStar());
        recommendVideoVO.setTitle(video.getVideoName());
        recommendVideoVO.setLikes(video.getLike());
        return recommendVideoVO;
    }
}
