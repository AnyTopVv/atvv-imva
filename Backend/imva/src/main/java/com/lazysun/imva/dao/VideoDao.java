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

    List<VideoDetailDto> findByIds(@Param("ids") List<Long> ids);


    List<Long> getRandomIds(@Param("count") int count);

    boolean insert(Video video);
}
