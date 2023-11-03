package com.lazysun.imva.moudel.po;

import lombok.Data;

/**
 * 临时文件记录表
 * @author: zoy0
 * @date: 2023/11/2 21:32
 */
@Data
public class TempUploadFile {
    /**
     * id
     */
    private Long id;

    /**
     * 上传id
     */
    private String uploadId;

    /**
     * 整个文件md5
     */
    private String md5;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 文件扩展名
     */
    private String fileExtension;

    /**
     * 是否启用
     */
    private Long enable;

    public TempUploadFile(String uploadId, String md5, Long userId, String fileName, String fileExtension) {
        this.uploadId = uploadId;
        this.md5 = md5;
        this.userId = userId;
        this.fileName = fileName;
        this.fileExtension = fileExtension;
    }
}
