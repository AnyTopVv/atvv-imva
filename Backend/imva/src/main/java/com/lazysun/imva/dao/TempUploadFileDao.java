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

    String findUploadIdByMD5(@Param("md5") String md5, @Param("userId") Long userId);

    int insert(TempUploadFile tempUploadFile);

    String getFileNameByUploadId(@Param("uploadId") String uploadId);

    int deleteByUploadId(@Param("uploadId") String uploadId);
}
