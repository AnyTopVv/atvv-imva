package com.lazysun.imva.utils;

import com.lazysun.imva.constant.ProviderConstant;
import com.lazysun.imva.moudel.dto.PartInfo;
import com.qiniu.common.QiniuException;
import com.qiniu.storage.ApiUploadV2ListParts;
import com.qiniu.storage.DownloadUrl;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import com.qiniu.util.StringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author: zoy0
 * @date: 2023/10/29 8:09
 */
@SpringBootTest
@ActiveProfiles("test")
class QiNiuUtilTest {

    @Test
    void getDownloadUrl() {
        String fileName = "test/test1.mp4";
        String downloadUrl = QiNiuUtil.getDownloadUrl(fileName, null);
        System.out.println(downloadUrl);
    }

    @Test
    void uploadFile() throws Exception {
//        List<PartInfo> list = new ArrayList<>();
//        RandomAccessFile file1 = new RandomAccessFile(new File("E:\\大三上\\七牛云1024\\data\\test-upload\\test6.mp4.part1"),"r");
//        String path = "";
//        String saveName = "uploadTest.mp4";
//        int partNumber = 1;
//        PartInfo partInfo1 = QiNiuUtil.uploadMultiPartFile(file1, path, saveName, partNumber);
//
//        RandomAccessFile file2 = new RandomAccessFile(new File("E:\\大三上\\七牛云1024\\data\\test-upload\\test6.mp4.part2"),"r");
//        partNumber++;
//        PartInfo partInfo2 = QiNiuUtil.uploadMultiPartFile(file2, path, saveName, partNumber);
//        list.add(partInfo1);
//        list.add(partInfo2);
//        Integer partNumberMarker = null;
//        List<Map<String, Object>> listPartInfo = new ArrayList<>();
//        QiNiuUtil.assembleUploadFile(list, path, saveName);
    }

    @Test
    void assembleUploadFile() throws Exception {
        File file = new File("E:\\大三上\\七牛云1024\\data\\test-upload\\test6.mp4");
        long fileSize = file.length();
        long twoPage = fileSize / 3;
        long onePage = fileSize - twoPage;
        RandomAccessFile raf = new RandomAccessFile(file, "r");
        byte[] buffer = new byte[(int) onePage];
        // 读取当前切片的数据
        int bytesRead = raf.read(buffer);
        FileOutputStream fos = new FileOutputStream("E:\\大三上\\七牛云1024\\data\\test-upload\\test6.mp4.part1");
        fos.write(buffer);

        buffer = new byte[(int) twoPage];
        bytesRead = raf.read(buffer);
        fos = new FileOutputStream("E:\\大三上\\七牛云1024\\data\\test-upload\\test6.mp4.part2");
        fos.write(buffer);
        fos.close();
        raf.close();
    }

}