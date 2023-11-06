package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * 评论点赞
 * @author: zoy0
 * @date: 2023/11/5 13:43
 */
@Data
public class CommentLikes {
    /**
     * 主键
     */
    private Long id;

    /**
     * 评论id
     */
    private Long commentId;

    /**
     * 用户id
     */
    private Long userId;
}
