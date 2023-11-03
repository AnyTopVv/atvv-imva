package com.lazysun.imva.constant;

/**
 * @author: zoy0
 * @date: 2023/11/3 15:33
 */
public class FileConstant {
    /**
     * 视频临时文件存储路径
     */
    public static final String TEMP_FILE_VIDEO_PATH = "temp/videos";

    /**
     * 视频缩略图临时文件存储路径
     */
    public static final String TEMP_FILE_PREVIEW_PATH = "temp/previews";

    /**
     * 视频文件存储路径
     */
    public static final String FILE_VIDEO_PATH = "videos/videos";

    /**
     * 视频缩略图文件存储路径
     */
    public static final String FILE_PREVIEW_PATH = "videos/previews";

    public static final String PREVIEW_FILE_PREFIX = "preview-";

    public static final String PREVIEW_FILE_SUFFIX = ".jpg";

    public static String getFilePreviewPath(String fileName){
        return PREVIEW_FILE_PREFIX + fileName.replace(".mp4",PREVIEW_FILE_SUFFIX);
    }
}
