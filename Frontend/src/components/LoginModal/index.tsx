import { useState, Fragment, useImperativeHandle, ReactElement } from 'react'
import { Modal, Form, Input, Button, message, Tabs } from 'antd'
import { userLogin, userRegister } from './service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { deepClone } from '@/utils/objectUtils/deepClone';
import JSEncrypt from "jsencrypt";
import { useAppDispatch } from '@/redux/hooks';
import { setIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import { setUser } from '@/redux/features/user/userSlice';

interface LoginModalProps {
  modalRef: any,
}

const LoginModal = (props: LoginModalProps): ReactElement => {
  const { modalRef } = props; // 从props传入modalRef
  const [isModalOpen, setIsModalOpen] = useState(false);  // 设置模态框的可见状态
  const [activeKey, setActiveKey] = useState('login');
  const dispatch = useAppDispatch();

  const modalStyles = {
    body: {
      background: '#fff',
      borderRadius: 5,
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    content: {
      backgroundImage: 'linear-gradient(0deg, rgba(119, 108, 233, 0.05), rgba(119, 108, 233, 0.3))',
      padding: '45px 50px',
    },
  };

  // 对外暴露open方法，外部组件可通过modalRef.open(callback)来展示模态框
  useImperativeHandle(modalRef, () => {	// 这里传入的ref是通过props传进来的
    return {
      open: (callback: Function) => {
        setIsModalOpen(true);
        callback && callback()
      }
    };
  });

  const onTabClick = (key: string) => {
    setActiveKey(key);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onLoginFinish = (values: any) => {
    const jsRsa = new JSEncrypt();
    jsRsa.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwl77aLZUb9z5LS+mfZu6N5NFPneLkUPdfUd+jf4fbULMtxvpVHNP0ioN33mU0Y1zYwlJpwU+HJqNsoYzeQ2jNYPmEwwA4JbyK7fyucO6vkCP11ixnaGb4oOcXo/E2igD6Q4wGK9QgmMC7kvroO0yyamYz3rAhVCQ1TlPja6HqhwIDAQAB')
    const formData = deepClone({
      username: values.username,
      password: jsRsa.encrypt(values.password),
    });
    userLogin(formData).then((res: any) => {
      if (res.data.code === 0) {
        message.success("登录成功！");
        const { username, avatar, token } = res.data.data;
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify({
          username: username,
          avatar: avatar,
        }))
        dispatch(setIsLogin(true));
        dispatch(setUser({
          username: username,
          avatar: avatar,
        }));
        const timeout = setTimeout(() => {
          window.location.reload();
          clearTimeout(timeout);
        }, 1000);
      } else {
        message.error(res.data.msg || "登录失败！请稍后重试！");
      }
    });
  }

  const onRegisterFinish = (values: any) => {
    const jsRsa = new JSEncrypt();
    jsRsa.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwl77aLZUb9z5LS+mfZu6N5NFPneLkUPdfUd+jf4fbULMtxvpVHNP0ioN33mU0Y1zYwlJpwU+HJqNsoYzeQ2jNYPmEwwA4JbyK7fyucO6vkCP11ixnaGb4oOcXo/E2igD6Q4wGK9QgmMC7kvroO0yyamYz3rAhVCQ1TlPja6HqhwIDAQAB')
    const formData = deepClone({
      username: values.username,
      password: jsRsa.encrypt(values.password),
    });
    userRegister(formData).then((res: any) => {
      if (res.data.code === 0) {
        message.success("注册成功！马上登录吧！");
        setActiveKey("register");
      } else {
        message.error(res.data.msg || "注册失败！请稍后重试！");
      }
    });
  }

  return (
    <Fragment>
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel} // 这个必须传，不传会导致模态框无法关闭
        wrapClassName="login-modal"
        width={452}
        footer={null}
        styles={modalStyles}
        centered
      >
        <Tabs
          activeKey={activeKey}
          onTabClick={onTabClick}
          defaultActiveKey="login"
          centered
          items={[
            {
              label: `登录`,
              key: 'login',
              children: <>
                <Form
                  name="login"
                  style={{ maxWidth: 600, padding: '20px' }}
                  onFinish={onLoginFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      确认
                    </Button>
                  </Form.Item>
                </Form>
              </>,
            },
            {
              label: `注册`,
              key: 'register',
              children: <>
                <Form
                  name="register"
                  style={{ maxWidth: 600, padding: '20px' }}
                  onFinish={onRegisterFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      确认
                    </Button>
                  </Form.Item>
                </Form>
              </>,
            },
          ]}
        />
      </Modal>
    </Fragment >
  )
}

export default LoginModal