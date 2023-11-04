package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.UpLoadVideoDto;
import com.lazysun.imva.moudel.dto.VideoDetailDto;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
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
    public ResponseVO<List<RecommendVideoVO>> getRecommendPageVideo(Long categoryId) {
        List<RecommendVideoVO> list = videoService.getRecommendVideo(categoryId);
        return ResponseVO.success(list);
    }

    /**
     * 获取视频详情页
     * @return
     */
    @GetMapping("/detail")
    public ResponseVO<RecommendVideoVO> getVideoDetail(@RequestParam Long videoId) {
        RecommendVideoVO video = videoService.getVideoDetailById(videoId);
        return ResponseVO.success(video);
    }

    /**
     * 上传视频
     * @param upLoadVideoDto
     * @return
     */
    @PostMapping("/upload")
    public ResponseVO uploadVideo(@RequestBody @Valid UpLoadVideoDto upLoadVideoDto){
        videoService.uploadVideo(upLoadVideoDto);
        return  ResponseVO.success();
    }



}
