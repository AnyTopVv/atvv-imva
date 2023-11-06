package com.lazysun.imva.moudel.dto;

import lombok.Data;

/**
 * 添加评论dto
 * @author: zoy0
 * @date: 2023/11/6 16:34
 */
@Data
public class AddVideoCommentDto {

    private Long videoId;

    private String commentContent;

}
