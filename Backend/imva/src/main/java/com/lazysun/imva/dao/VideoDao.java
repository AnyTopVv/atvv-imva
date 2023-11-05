package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.dto.VideoDetailDto;
import com.lazysun.imva.moudel.po.Video;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/10/30 13:53
 */
@Mapper
public interface VideoDao {

    /**
     * 通过id批量查询视频信息
     * @param ids idLiat
     * @return VideoDetailDto List
     */
    List<VideoDetailDto> findByIds(@Param("ids") List<Long> ids);


    /**
     * 获取随机视频id
     * @param count 获取个数
     * @param categoryId 分区id
     * @return id List
     */
    List<Long> getRandomIds(@Param("count") int count, @Param("categoryId") Long categoryId);

    /**
     * 插入视频信息
     * @param video
     * @return
     */
    boolean insert(Video video);

    Integer count(@Param("categoryId")Long categoryId);

    List<Long> getAllIds(@Param("categoryId")Long categoryId);
}
