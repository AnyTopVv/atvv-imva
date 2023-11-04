package com.lazysun.imva.service.impl;

import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.constant.FileConstant;
import com.lazysun.imva.constant.RedisConstant;
import com.lazysun.imva.dao.TempUploadFileDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.FileChunksDto;
import com.lazysun.imva.moudel.dto.PartInfo;
import com.lazysun.imva.moudel.dto.UserContext;
import com.lazysun.imva.moudel.po.TempUploadFile;
import com.lazysun.imva.moudel.vo.UploadDetailVO;
import com.lazysun.imva.service.FileService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.lazysun.imva.utils.RedisUtil;
import com.qiniu.common.QiniuException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author: zoy0
 * @date: 2023/11/2 22:37
 */
@Service
public class FileServiceImpl implements FileService {

    @Resource
    private TempUploadFileDao tempUploadFileDao;

    @Override
    public UploadDetailVO findUploadDetailByMD5(String md5, String fileExtension) {
        Long userId = UserContext.getUserId();
        String uploadId = tempUploadFileDao.findUploadIdByMD5(md5, userId);
        Set<Object> partInfosSet = RedisUtil.sGet(RedisConstant.getPartInfosSetKey(uploadId));
        if (Objects.isNull(uploadId) || partInfosSet.isEmpty()) {
            String fileName = UUID.randomUUID().toString();
            try {
                uploadId = QiNiuUtil.getUploadId(FileConstant.TEMP_FILE_VIDEO_PATH, fileName + "." + fileExtension);
            } catch (QiniuException e) {
                e.printStackTrace();
                throw new ImvaServiceException(ErrorCode.GET_UPLOAD_ID_ERROR);
            }
            tempUploadFileDao.insertOverlay(new TempUploadFile(uploadId,md5,userId,fileName,fileExtension));
            Map<String,Object> map = new HashMap<>();
            map.put("fileName",fileName);
            map.put("fileExtension",fileExtension);
            RedisUtil.hmset(RedisConstant.getUploadIdKey(uploadId),map,RedisConstant.TWO_HOUR_TIME);
        }
        return new UploadDetailVO(uploadId, partInfosSet.stream().map(o -> ((PartInfo)o).getPartNumber()).collect(Collectors.toSet()));
    }

    @Override
    public void uploadFileChunk(FileChunksDto fileChunksDto) {
        Map<Object, Object> map = RedisUtil.hmget(RedisConstant.getUploadIdKey(fileChunksDto.getUploadId()));
        String fileName = (String) map.get("fileName");
        String fileExtension = (String) map.get("fileExtension");
        //上传切片
        try {
            PartInfo partInfo = QiNiuUtil.uploadMultiPartFile(fileChunksDto.getUploadId(), fileChunksDto.getFile(), FileConstant.TEMP_FILE_VIDEO_PATH, fileName + "." + fileExtension, fileChunksDto.getIndex());
            RedisUtil.sSetAndTime(RedisConstant.getPartInfosSetKey(fileChunksDto.getUploadId()),RedisConstant.COMMON_EXPIRE_TIME,partInfo);
        } catch (IOException e) {
            throw new ImvaServiceException(ErrorCode.FILE_ERROR_UPLOAD);
        }

        if (RedisUtil.sGetSetSize(RedisConstant.getPartInfosSetKey(fileChunksDto.getUploadId())) == fileChunksDto.getTotalChunk()) {
            //组合切片
            try {
                Set<Object> partInfosSet = RedisUtil.sGet(RedisConstant.getPartInfosSetKey(fileChunksDto.getUploadId()));
                QiNiuUtil.assembleUploadFile(fileChunksDto.getUploadId(),
                        partInfosSet.stream().map(o -> (PartInfo) o).sorted(Comparator.comparingInt(PartInfo::getPartNumber)).collect(Collectors.toList()),
                        FileConstant.TEMP_FILE_VIDEO_PATH, fileName + "." + fileExtension);
                tempUploadFileDao.deleteByUploadId(fileChunksDto.getUploadId());
            } catch (IOException e) {
                throw new ImvaServiceException(ErrorCode.FILE_ERROR_ASSEMBLE);
            }
        }
    }
}
