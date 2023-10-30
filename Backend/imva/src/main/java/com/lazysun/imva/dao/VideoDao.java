package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.dto.VideoDetailDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/10/30 13:53
 */
@Mapper
public interface VideoDao {

    List<VideoDetailDto> findByIds(@Param("start") List<Long> ids);


    List<Long> getRamdomIds(@Param("count") int count);
}
