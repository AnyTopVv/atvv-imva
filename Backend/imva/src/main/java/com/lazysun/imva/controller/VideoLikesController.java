package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.VideoLikesDto;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoLikesService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/11/5 18:51
 */
@RestController
@RequestMapping("/video/likes")
public class VideoLikesController {

    @Resource
    private VideoLikesService videoLikesService;

    @PostMapping("/operate")
    public ResponseVO<Void> operate(@RequestBody VideoLikesDto videoLikesDto){
        videoLikesService.operate(videoLikesDto);
        return ResponseVO.success();
    }

}
