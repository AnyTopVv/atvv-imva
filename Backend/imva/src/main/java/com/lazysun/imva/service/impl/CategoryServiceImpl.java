package com.lazysun.imva.service.impl;

import com.lazysun.imva.dao.CategoryDao;
import com.lazysun.imva.moudel.po.Category;
import com.lazysun.imva.moudel.vo.CategoryVo;
import com.lazysun.imva.service.CategoryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: zoy0
 * @date: 2023/11/4 15:51
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Resource
    private CategoryDao categoryDao;

    @Override
    public List<CategoryVo> getAllCategory() {
        List<Category> list = categoryDao.getAllCategory();
        return list.stream().map(category -> new CategoryVo(category.getId(),category.getCategoryName())).collect(Collectors.toList());
    }
}
