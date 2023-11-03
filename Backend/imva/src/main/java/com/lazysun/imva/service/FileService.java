package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.FileChunksDto;
import com.lazysun.imva.moudel.vo.UploadDetailVO;
import org.springframework.stereotype.Service;

/**
 * 文件逻辑层
 * @author: zoy0
 * @date: 2023/11/2 22:37
 */
public interface FileService {

    /**
     * 通过md5获取上传信息
     * @param md5 md5
     * @param fileExtension 文件扩展名
     * @return
     */
    UploadDetailVO findUploadDetailByMD5(String md5, String fileExtension);

    /**
     * 上传切片
     * @param fileChunksDto 切片dto
     */
    void uploadFileChunk(FileChunksDto fileChunksDto);
}
