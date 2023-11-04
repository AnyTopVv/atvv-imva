package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/11/4 15:53
 */
@Mapper
public interface CategoryDao {

    List<Category> getAllCategory();
}
