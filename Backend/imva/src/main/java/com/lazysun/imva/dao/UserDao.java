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

    User findByUserName(@Param("username") String username);

    boolean insert(User user);
}
