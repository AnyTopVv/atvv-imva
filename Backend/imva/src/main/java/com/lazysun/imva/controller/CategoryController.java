package com.lazysun.imva.controller;

import com.lazysun.imva.moudel.po.Category;
import com.lazysun.imva.moudel.vo.CategoryVo;
import com.lazysun.imva.moudel.vo.ResponseVO;
import com.lazysun.imva.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author: zoy0
 * @date: 2023/11/4 15:48
 */
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    @GetMapping("/getAll")
    public  ResponseVO<List<CategoryVo>> getAllCategory(){
        return ResponseVO.success(categoryService.getAllCategory());
    }
}
