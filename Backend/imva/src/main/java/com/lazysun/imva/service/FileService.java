package com.lazysun.imva.service;

import com.lazysun.imva.moudel.dto.FileChunksDto;
import com.lazysun.imva.moudel.vo.UploadDetailVO;
import org.springframework.stereotype.Service;

/**
 * @author: zoy0
 * @date: 2023/11/2 22:37
 */
public interface FileService {
    
    UploadDetailVO findUploadDetailByMD5(String md5, String fileExtension);

    void uploadFileChunk(FileChunksDto fileChunksDto);
}
