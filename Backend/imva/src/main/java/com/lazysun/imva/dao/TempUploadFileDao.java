package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.TempUploadFile;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author: zoy0
 * @date: 2023/11/2 21:33
 */
@Mapper
public interface TempUploadFileDao {

    /**
     * 通过md5和用户id获取上传id
     * @param md5 文件md5
     * @param userId 用户id
     * @return 上传id
     */
    String findUploadIdByMD5(@Param("md5") String md5, @Param("userId") Long userId);

    /**
     * 插入或覆写临时上传文件记录
     * @param tempUploadFile
     * @return
     */
    int insertOverlay(TempUploadFile tempUploadFile);

    /**
     * 通过上传id获取文件名
     * @param uploadId 上传id
     * @return 文件名
     */
    String getFileNameByUploadId(@Param("uploadId") String uploadId);

    /**
     * 通过上传id删除记录
     * @param uploadId 上传id
     * @return
     */
    int deleteByUploadId(@Param("uploadId") String uploadId);

    /**
     * 通过md5和用户名获得简略文件信息
     * @param md5 md5
     * @param userId 用户id
     * @return tempUploadFile
     */
    TempUploadFile getFileInfoByMD5(@Param("md5") String md5, @Param("userId") Long userId);
}
