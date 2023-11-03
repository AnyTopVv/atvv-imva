package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.UpLoadVideoDto;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/10/28 20:28
 */
@RestController
@RequestMapping("/video")
public class VideoController {

    @Resource
    private VideoService videoService;

    /**
     * 获取推荐视频
     * @return
     */
    @GetMapping("/getRecommendPageVideo")
    public ResponseVO<List<RecommendVideoVO>> getRecommendPageVideo() {
        List<RecommendVideoVO> list = videoService.getRecommendVideo();
        return ResponseVO.success(list);
    }

    /**
     * 上传视频
     * @param upLoadVideoDto
     * @return
     */
    @PostMapping("/upload")
    public ResponseVO uploadVideo(@RequestBody UpLoadVideoDto upLoadVideoDto){
        videoService.uploadVideo(upLoadVideoDto);
        return  ResponseVO.success();
    }

}
