package com.lazysun.imva.config;

import com.lazysun.imva.constant.ProviderConstant;
import com.qiniu.util.Auth;
import org.apache.commons.pool2.BasePooledObjectFactory;
import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.impl.DefaultPooledObject;

import javax.annotation.Resource;

/**
 * @author: zoy0
 * @date: 2023/10/28 22:17
 */
public class QiNiuAuthPoolFactory extends BasePooledObjectFactory<Auth> {

    private final String ACCESS_KEY = ProviderConstant.qiNiuConfig.getAccessKey();
    private final String SECRET_KEY = ProviderConstant.qiNiuConfig.getSecretKey();

    @Override
    public PooledObject<Auth> makeObject() throws Exception {
        Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
        return new DefaultPooledObject<>(auth);
    }

    @Override
    public void destroyObject(PooledObject<Auth> pooledObject) throws Exception {
        //不处理
    }

    @Override
    public boolean validateObject(PooledObject<Auth> pooledObject) {
        return true;
    }

    @Override
    public void activateObject(PooledObject<Auth> pooledObject) throws Exception {
        //不处理
    }

    @Override
    public void passivateObject(PooledObject<Auth> pooledObject) throws Exception {
        //不处理
    }

    @Override
    public Auth create() throws Exception {
        return Auth.create(ACCESS_KEY, SECRET_KEY);
    }

    @Override
    public PooledObject<Auth> wrap(Auth obj) {
        return new DefaultPooledObject<>(obj);
    }
}
