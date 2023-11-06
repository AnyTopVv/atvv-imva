package com.lazysun.imva.moudel.vo;

import com.lazysun.imva.moudel.po.Comment;
import lombok.Data;

import java.util.List;

/**
 * 视频评论Dto
 * @author: zoy0
 * @date: 2023/11/6 16:16
 */
@Data
public class VideoCommentVo {

    /**
     * 视频id
     */
    private Long videoId;

    /**
     * 同评论数
     */
    private Integer totalNumber;

    /**
     * 当前页数
     */
    private Integer pageNumber;

    /**
     * 用户评论
     */
    private List<UserContent> userComments;

    @Data
    public static class UserContent{

        private Long commentId;

        private Long userId;

        private String userName;

        private String userAvatar;

        private Long createTime;

        private String commentContent;

        private Integer likes;

        private Integer userLike;

        public static UserContent build(Comment comment){
            UserContent userContent = new UserContent();
            userContent.setUserId(comment.getUserId());
            userContent.setCommentId(comment.getId());
            userContent.setCreateTime(comment.getCreateTime().getTime());
            userContent.setLikes(comment.getLikes());
            userContent.setCommentContent(comment.getCommentContent());
            return userContent;
        }
    }
}
