package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.dto.FileChunksDto;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.VideoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/10/31 23:40
 */
@RestController
@RequestMapping("/file")
public class FileController {

    @Resource
    private VideoService videoService;

    /**
     * 分片上传
     * @param fileChunksDto
     * @return
     */
    @PostMapping("/uploadChunk")
    public ResponseVO upLoadFileChunk(@RequestBody FileChunksDto fileChunksDto){
        return  null;
    }

    /**
     * 根据文件md5获取uploadId
     * @param md5
     * @return
     */
    @GetMapping("/getUploadId")
    public ResponseVO getUploadId(String md5,String fileExtension){
        return ResponseVO.success(videoService.findUploadIdByMD5(md5, fileExtension));
    }
}
