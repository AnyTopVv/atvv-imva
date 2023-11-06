package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.AddVideoCommentDto;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.CommentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
