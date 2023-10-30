package com.lazysun.imva.moudel.vo;

import com.lazysun.imva.moudel.dto.VideoDetailDto;
import lombok.Data;

import java.util.UUID;

/**
 * @author: zoy0
 * @date: 2023/10/28 23:30
 */
@Data
public class RecommendVideoVO {

    private String videoSrc;

    private String videoPreview;

    private String authorAvatarSrc;

    private String author;

    private String title;

    private String category;

    private Long uuid;

    private Integer likes;

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
