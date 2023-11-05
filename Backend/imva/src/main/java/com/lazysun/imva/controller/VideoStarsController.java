package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.VideoStarsDto;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoStarsService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/11/5 18:52
 */
@RestController
@RequestMapping("/video/stars")
public class VideoStarsController {

    @Resource
    private VideoStarsService videoStarsService;

    @PostMapping("/operate")
    public ResponseVO<Void> operate(@RequestBody VideoStarsDto videoStarsDto){
        videoStarsService.operate(videoStarsDto);
        return ResponseVO.success();
    }
}
