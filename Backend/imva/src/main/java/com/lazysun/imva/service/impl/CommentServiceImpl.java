package com.lazysun.imva.service.impl;

import com.lazysun.imva.constant.RedisConstant;
import com.lazysun.imva.constant.VideoOperationEnum;
import com.lazysun.imva.dao.CommentDao;
import com.lazysun.imva.dao.CommentLikesDao;
import com.lazysun.imva.dao.UserDao;
import com.lazysun.imva.moudel.dto.AddVideoCommentDto;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.dto.VideoCommentLikesDto;
import com.lazysun.imva.moudel.po.Comment;
import com.lazysun.imva.moudel.po.CommentLikes;
import com.lazysun.imva.moudel.po.User;
import com.lazysun.imva.moudel.vo.VideoCommentVo;
import com.lazysun.imva.service.CommentService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.lazysun.imva.utils.RedisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:57
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Resource
    private CommentLikesDao commentLikesDao;

    @Resource
    private CommentDao commentDao;

    @Resource
    private UserDao userDao;

    @Override
    public void addComment(AddVideoCommentDto addVideoCommentDto) {
        Long userId = UserContext.getUserId();
        Comment comment = new Comment();
        comment.setCommentContent(addVideoCommentDto.getCommentContent());
        comment.setUserId(userId);
        comment.setEnable(0L);
        comment.setLikes(0);
        comment.setVideoId(addVideoCommentDto.getVideoId());
        comment.setCreateTime(new Date());
        commentDao.insert(comment);
    }

    @Override
    public VideoCommentVo listCommentPage(Long videoId, Integer pageNumber) {
        Long userId = UserContext.getUserId();
        if (Objects.isNull(userId)) {
            userId = 0L;
        }
        List<Comment> comments = commentDao.pageList(videoId, (pageNumber - 1) * 10, 10);
        Integer count = commentDao.pageListCount(videoId);
        VideoCommentVo videoCommentVo = new VideoCommentVo(videoId, count, pageNumber);
        List<VideoCommentVo.UserComment> list = new ArrayList<>();
        for (Comment comment :
                comments) {
            VideoCommentVo.UserComment userComment = VideoCommentVo.UserComment.build(comment);
            userComment.setLikes(Integer.valueOf(RedisUtil.get(RedisConstant.getVideoCommentLikesNumberKey(comment.getId())).toString()));
            if (Objects.nonNull(commentLikesDao.isLiked(userId, comment.getId()))) {
                userComment.setUserLike(1);
            } else {
                userComment.setUserLike(0);
            }
            User commentator = userDao.findSampleInfoByUserId(comment.getUserId());
            userComment.setUserName(commentator.getUsername());
            userComment.setUserAvatar(QiNiuUtil.getDownloadUrl(commentator.getAvatar(), null));
            list.add(userComment);
        }
        videoCommentVo.setUserComments(list);
        return videoCommentVo;
    }

    @Override
    public void commentLikesOperate(VideoCommentLikesDto videoCommentLikesDto) {
        Long userId = UserContext.getUserId();
        if (VideoOperationEnum.VIDEO_LIKE.getCode().equals(videoCommentLikesDto.getLike())) {
            CommentLikes commentLikes = new CommentLikes(videoCommentLikesDto.getCommentId(),userId);
            RedisUtil.incr(RedisConstant.getVideoCommentLikesNumberKey(videoCommentLikesDto.getCommentId()),1);
            commentLikesDao.insert(commentLikes);
        } else if (VideoOperationEnum.VIDEO_UN_LIKE.getCode().equals(videoCommentLikesDto.getLike())) {
            RedisUtil.decr(RedisConstant.getVideoCommentLikesNumberKey(videoCommentLikesDto.getCommentId()),1);
            commentLikesDao.delete(userId, videoCommentLikesDto.getCommentId());
        }
    }
}
