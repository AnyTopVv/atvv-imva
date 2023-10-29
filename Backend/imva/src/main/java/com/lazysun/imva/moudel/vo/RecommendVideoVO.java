package com.lazysun.imva.moudel.vo;

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

    private String uuid;

    private String likes;

    private String stars;

    public static RecommendVideoVO test(){
        RecommendVideoVO recommendVideoVO = new RecommendVideoVO();
        recommendVideoVO.setAuthor("zoy0");
        recommendVideoVO.setCategory("娱乐");
        recommendVideoVO.setVideoPreview("https://img.lazysun.me/202310212220891.jpg");
        recommendVideoVO.setLikes("0");
        recommendVideoVO.setStars("0");
        recommendVideoVO.setAuthorAvatarSrc("https://img.lazysun.me/cover-202310092119179.webp");
        return recommendVideoVO;
    }
}
