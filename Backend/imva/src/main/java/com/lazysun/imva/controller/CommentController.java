package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.AddVideoCommentDto;
import com.lazysun.imva.moudel.dto.VideoCommentLikesDto;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.moudel.vo.VideoCommentVo;
import com.lazysun.imva.service.CommentService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/11/6 16:45
 */
@RestController
@RequestMapping("/video/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @PostMapping("/add")
    public ResponseVO<Void> addComment(@RequestBody AddVideoCommentDto addVideoCommentDto){
        commentService.addComment(addVideoCommentDto);
        return ResponseVO.success();
    }

    @GetMapping("/list")
    public ResponseVO<VideoCommentVo> listComment(@RequestParam Long videoId, @RequestParam Integer pageNumber){
        return ResponseVO.success(commentService.listCommentPage(videoId,pageNumber));
    }

    @PostMapping("/operate")
    public ResponseVO<Void> commentLikesOperate(@RequestBody VideoCommentLikesDto videoCommentLikesDto){
        commentService.commentLikesOperate(videoCommentLikesDto);
        return ResponseVO.success();
    }

}
