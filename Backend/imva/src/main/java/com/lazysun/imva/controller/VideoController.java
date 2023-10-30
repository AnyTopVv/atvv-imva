package com.lazysun.imva.controller;

import com.lazysun.imva.config.QiNiuConfig;
import com.lazysun.imva.moudel.vo.RecommendVideoVO;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.qiniu.common.QiniuException;
import com.qiniu.storage.DownloadUrl;
import com.qiniu.util.Auth;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
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

    @GetMapping("/getRecommendPageVideo")
    public ResponseVO<List<RecommendVideoVO>> test() {
        List<RecommendVideoVO> list = videoService.getRecommendVideo();
        return ResponseVO.success(list);
    }

}
