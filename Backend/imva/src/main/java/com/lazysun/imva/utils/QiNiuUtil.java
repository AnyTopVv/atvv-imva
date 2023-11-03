package com.lazysun.imva.utils;

import com.lazysun.imva.config.SingletonAuth;
import com.lazysun.imva.constant.ProviderConstant;
import com.lazysun.imva.moudel.dto.PartInfo;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Client;
import com.qiniu.storage.*;
import com.qiniu.util.Auth;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author: zoy0
 * @date: 2023/10/28 22:28
 */
public class QiNiuUtil {

    /**
     * 获取cdn下载链接
     *
     * @param fileName        文件路径
     * @param expireInSeconds 过期时间
     * @return
     */
    public static String getDownloadUrl(String fileName, Long expireInSeconds) {
        if (expireInSeconds == null) {
            expireInSeconds = 3600L;
        }
        Auth auth = SingletonAuth.getInstance();
        long deadline = System.currentTimeMillis() / 1000 + expireInSeconds;
        DownloadUrl url = new DownloadUrl(ProviderConstant.qiNiuConfig.getCdnUrl(), false, fileName);
        try {
            return url.buildURL(auth, deadline);
        } catch (QiniuException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getUploadId(String path, String fileName) throws QiniuException {
        ApiUploadV2InitUpload.Request initUploadRequest = new ApiUploadV2InitUpload.Request(ProviderConstant.qiNiuConfig.getRegionUploadUrl(), QiNiuParameter.getUploadToken())
                .setKey(path + "/" + fileName);
        ApiUploadV2InitUpload.Response initUploadResponse = QiNiuParameter.getApiUploadV2InitUpload().request(initUploadRequest);
        return initUploadResponse.getUploadId();
    }

    /**
     * 上传文件切片
     *
     * @param file         文件
     * @param path         存储路径
     * @param saveFileName 保存文件名
     * @param partNumber   第几块切片
     * @return 是否上传成功
     */
    public static PartInfo uploadMultiPartFile(String uploadId, MultipartFile file, String path, String saveFileName, int partNumber) throws IOException {
        String urlPrefix = ProviderConstant.qiNiuConfig.getRegionUploadUrl();
        String token = QiNiuParameter.getUploadToken();

        // 上传文件数据
        byte[] partData = file.getBytes();
        PartInfo partInfo = new PartInfo();
        ApiUploadV2UploadPart.Request uploadPartRequest = new ApiUploadV2UploadPart.Request(urlPrefix, token, uploadId, partNumber)
                .setKey(path + "/" + saveFileName)
                .setUploadData(partData, 0, partData.length, null);

        ApiUploadV2UploadPart.Response uploadPartResponse = QiNiuParameter.getApiUploadV2UploadPart().request(uploadPartRequest);
        partInfo.setMd5(uploadPartResponse.getMd5());
        partInfo.setPartNumber(partNumber);
        partInfo.setEtag(uploadPartResponse.getEtag());

        return partInfo;
    }


    /**
     * 组织上传的文件
     *
     * @param partInfoList 已上传文件信息
     * @param path         保存路径
     * @param saveFileName 保存文件名
     */
    public static void assembleUploadFile(String uploadId, List<PartInfo> partInfoList, String path, String saveFileName) throws IOException {
        String urlPrefix = ProviderConstant.qiNiuConfig.getRegionUploadUrl();
        String token = QiNiuParameter.getUploadToken();

        // 将pageInfo转化为map
        List<Map<String, Object>> partInfoMapList = partInfoList.stream().map(partInfo -> {
            Map<String, Object> map = new HashMap<>();
            map.put("partNumber", partInfo.getPartNumber());
            map.put("etag", partInfo.getEtag());
            return map;
        }).collect(Collectors.toList());

        //参数,x:foo为必带
        Map<String, Object> customParam = new HashMap<>();
        customParam.put("x:foo", "foo-Value");

        ApiUploadV2CompleteUpload.Request completeUploadRequest = new ApiUploadV2CompleteUpload.Request(urlPrefix, token, uploadId, partInfoMapList)
                .setKey(path + "/" + saveFileName)
                .setFileName(saveFileName)
                .setCustomParam(customParam);

        QiNiuParameter.getApiUploadV2CompleteUpload().request(completeUploadRequest);
    }

    /**
     * 移动文件
     * @param key1 被移动文件
     * @param key2 移动位置
     */
    public static void moveFile(String key1,String key2) throws QiniuException {
        BucketManager bucketManager = QiNiuParameter.getBucketManager();
        String bucket = ProviderConstant.qiNiuConfig.getBucket();
        bucketManager.move(bucket,key1,bucket,key2);
    }

    /**
     * 获取文件的字节码数组
     */
    private static byte[] getFilByte(RandomAccessFile file) throws IOException {
        if (file.length() > Integer.MAX_VALUE) {
            throw new IOException("文件大小超过int最大值");
        }
        int size = (int) file.length();
        byte[] uploadData = new byte[size];
        try {
            file.seek(0);
            int readSize = 0;
            while (readSize != size) {
                int s = 0;
                try {
                    s = file.read(uploadData, readSize, size - readSize);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                if (s >= 0) {
                    readSize += s;
                } else {
                    break;
                }
            }
        } catch (IOException e) {
            uploadData = null;
        }
        return uploadData;
    }

    /**
     * 七牛云的一些常用参数和变量
     */
    private static class QiNiuParameter {

        private static String uploadToken;

        private static Long uploadTokenExpires;

        private static ApiUploadV2InitUpload apiUploadV2InitUpload;

        private static ApiUploadV2UploadPart apiUploadV2UploadPart;

        private static ApiUploadV2CompleteUpload apiUploadV2CompleteUpload;

        private static BucketManager bucketManager;

        /**
         * 获取上传token，避免反复创建
         *
         * @return uploadToken
         */
        public static String getUploadToken() {
            if (Objects.isNull(uploadToken) || uploadTokenExpires > System.currentTimeMillis()) {
                refreshToken();
            }
            return uploadToken;
        }

        public static ApiUploadV2InitUpload getApiUploadV2InitUpload() {
            if (Objects.isNull(apiUploadV2InitUpload)) {
                Configuration configuration = new Configuration();
                Client client = new Client(configuration);
                apiUploadV2InitUpload = new ApiUploadV2InitUpload(client);
            }
            return apiUploadV2InitUpload;
        }

        public static ApiUploadV2UploadPart getApiUploadV2UploadPart() {
            if (Objects.isNull(apiUploadV2UploadPart)) {
                Configuration configuration = new Configuration();
                Client client = new Client(configuration);
                apiUploadV2UploadPart = new ApiUploadV2UploadPart(client);
            }
            return apiUploadV2UploadPart;
        }

        public static ApiUploadV2CompleteUpload getApiUploadV2CompleteUpload() {
            if (Objects.isNull(apiUploadV2CompleteUpload)) {
                Configuration configuration = new Configuration();
                Client client = new Client(configuration);
                apiUploadV2CompleteUpload = new ApiUploadV2CompleteUpload(client);
            }
            return apiUploadV2CompleteUpload;
        }

        private static BucketManager getBucketManager(){
            if (Objects.isNull(bucketManager)) {
                Configuration configuration = new Configuration();
                bucketManager = new BucketManager(SingletonAuth.getInstance(),configuration);
            }
            return bucketManager;
        }

        private static void refreshToken() {
            //默认过期时间为360s
            uploadToken = SingletonAuth.getInstance().uploadToken(ProviderConstant.qiNiuConfig.getBucket());
            uploadTokenExpires = System.currentTimeMillis() + 300 * 1000;
        }
    }


}
