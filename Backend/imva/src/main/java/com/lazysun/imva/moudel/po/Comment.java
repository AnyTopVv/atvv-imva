package com.lazysun.imva.moudel.po;

import lombok.Data;

import java.util.Date;

/**
 * 评论
 * @author: zoy0
 * @date: 2023/11/5 13:42
 */
@Data
public class Comment {

    /**
     * 主键
     */
    private Long id;

    /**
     * 视频id
     */
    private Long videoId;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 评论内容
     */
    private String commentContent;

    /**
     * 点赞数
     */
    private Integer likes;

    /**
     * 是否启用
     */
    private Long enable;
}
