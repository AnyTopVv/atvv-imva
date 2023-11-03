package com.lazysun.imva.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.lazysun.imva.constant.ErrorCode;
import com.lazysun.imva.dao.TempUploadFileDao;
import com.lazysun.imva.exception.ImvaServiceException;
import com.lazysun.imva.moudel.dto.FileChunksDto;
import com.lazysun.imva.moudel.dto.PartInfo;
import com.lazysun.imva.moudel.po.TempUploadFile;
import com.lazysun.imva.moudel.vo.UploadDetailVO;
import com.lazysun.imva.service.FileService;
import com.lazysun.imva.utils.QiNiuUtil;
import com.qiniu.common.QiniuException;
import org.springframework.data.redis.core.RedisTemplate;
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
    private RedisTemplate<String, Object> redisTemplate;

    @Resource
    private TempUploadFileDao tempUploadFileDao;

    @Override
    public UploadDetailVO findUploadDetailByMD5(String md5, String fileExtension) {
        Long userId = 2L;
        String uploadId = tempUploadFileDao.findUploadIdByMD5(md5, userId);
        if (Objects.isNull(uploadId)) {
            String fileName = UUID.randomUUID() + "." + fileExtension;
            try {
                uploadId = QiNiuUtil.getUploadId("video/video", fileName);
            } catch (QiniuException e) {
                e.printStackTrace();
                throw new ImvaServiceException(ErrorCode.GET_UPLOAD_ID_ERROR);
            }
            tempUploadFileDao.insert(new TempUploadFile(uploadId,md5,userId,fileName));
        }
        Set<Integer> chunks = new HashSet<>();
        Set<Object> members = redisTemplate.opsForSet().members("filechunks:" + uploadId);
        if (Objects.nonNull(members)) {
            chunks.addAll(members.stream().map(o -> (Integer) o).collect(Collectors.toList()));
        }
        return new UploadDetailVO(uploadId, chunks);
    }

    @Override
    public void uploadFileChunk(FileChunksDto fileChunksDto) {
        String filename = tempUploadFileDao.getFileNameByUploadId(fileChunksDto.getUploadId());
        try {
            PartInfo partInfo = QiNiuUtil.uploadMultiPartFile(fileChunksDto.getUploadId(), fileChunksDto.getFile(), "video/video", filename, fileChunksDto.getIndex());
            redisTemplate.opsForSet().add("filechunks:" + fileChunksDto.getUploadId(), fileChunksDto.getIndex());
            redisTemplate.opsForSet().add("partInfosSet:" + fileChunksDto.getUploadId(), partInfo);
        } catch (IOException e) {
            throw new ImvaServiceException(ErrorCode.FILE_ERROR_UPLOAD);
        }
        Set<Object> partInfosSet = redisTemplate.opsForSet().members("partInfosSet:" + fileChunksDto.getUploadId());
        if (partInfosSet.size() == fileChunksDto.getTotalChunk()) {
            try {
                QiNiuUtil.assembleUploadFile(fileChunksDto.getUploadId(), partInfosSet.stream().map(o -> (PartInfo) o).sorted(Comparator.comparingInt(PartInfo::getPartNumber)).collect(Collectors.toList()), "video/video", filename);
                tempUploadFileDao.deleteByUploadId(fileChunksDto.getUploadId());
            } catch (IOException e) {
                throw new ImvaServiceException(ErrorCode.FILE_ERROR_ASSEMBLE);
            }
        }
    }
}
