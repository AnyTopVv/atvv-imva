package com.lazysun.imva.moudel.vo;

import com.lazysun.imva.moudel.po.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 视频评论Dto
 * @author: zoy0
 * @date: 2023/11/6 16:16
 */
@Data
@NoArgsConstructor
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
    private List<UserComment> userComments;


    public VideoCommentVo(Long videoId, Integer totalNumber, Integer pageNumber) {
        this.videoId = videoId;
        this.totalNumber = totalNumber;
        this.pageNumber = pageNumber;
    }

    @Data
    public static class UserComment{

        private Long commentId;

        private Long userId;

        private String userName;

        private String userAvatar;

        private Long createTime;

        private String commentContent;

        private Integer likes;

        private Integer userLike;

        public static UserComment build(Comment comment){
            UserComment userContent = new UserComment();
            userContent.setUserId(comment.getUserId());
            userContent.setCommentId(comment.getId());
            userContent.setCreateTime(comment.getCreateTime().getTime());
            userContent.setLikes(comment.getLikes());
            userContent.setCommentContent(comment.getCommentContent());
            return userContent;
        }
    }
}
