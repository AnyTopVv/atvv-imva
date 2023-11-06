package com.lazysun.imva.dao;

import com.lazysun.imva.moudel.po.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author: zoy0
 * @date: 2023/10/29 13:35
 */
@Mapper
public interface UserDao {

    /**
     * 通过用户名获取用户信息
     * @param username 用户名
     * @return user
     */
    User findByUserName(@Param("username") String username);

    /**
     * 插入用户
     * @param user 用户名
     * @return
     */
    boolean insert(User user);

    User findSampleInfoByUserId(@Param("id") Long id);
}
