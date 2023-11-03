import { Button, Input, Layout, Menu, Image, Avatar, Popover } from 'antd';
import SiderRouters from '@/routes/SiderRoutes';
import { meunItems } from '@/routes/routesConfig';
import { useRef, type FC, type ReactElement } from 'react';
import atvvWordsSrc from '@/assets/atvv-words.png';
import { PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/LoginModal';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import { selectUserAvatar, selectUsername } from '@/redux/features/user/userSlice';

const { Header, Sider, Content } = Layout;

const BaseLayout: FC = (): ReactElement => {
  const isLogin = useAppSelector(selectIsLogin);
  const username = useAppSelector(selectUsername);
  const avatar = useAppSelector(selectUserAvatar);
  const navigate = useNavigate();
  const LoginModalRef: any = useRef();

  const exitLogin = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <>
      <Layout
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <Sider
          style={{
            overflowY: 'auto',
          }}
          theme='light' trigger={null}
        >
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Image alt="ATVV-IMVA" preview={false} src={atvvWordsSrc} height={50} />
          </div>
          <Menu mode='inline' items={meunItems} style={{ padding: '5px' }} />
        </Sider>
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '8%',
              lineHeight: '8%',
              fontSize: '20px',
              borderBottom: '1px solid #EDEDED',
              backgroundColor: '#F5F5F5'
            }}
          >
            <Input.Search></Input.Search>
            {
              isLogin ?
                <Button type="text" icon={<PlusSquareOutlined />} onClick={() => { navigate('/upload') }}>
                  投稿
                </Button> :
                null
            }
            {username ? avatar ? <Popover
              placement="bottom"
              title={<>
                <div>{username}</div>
              </>}
              content={<>
                <Button onClick={exitLogin}>退出登录</Button>
              </>}
            >
              <div style={{ cursor: "pointer" }} >
                <Avatar src={avatar} />
              </div>
            </Popover> :
              <Popover
                placement="bottom"
                title={<>
                  <div>{username}</div>
                </>}
                content={<>
                  <Button onClick={exitLogin}>退出登录</Button>
                </>}
              >
                <div style={{ cursor: "pointer" }} >
                  <Avatar>{username}</Avatar>
                </div>
              </Popover> :
              <Button
                type='primary'
                icon={<UserOutlined />}
                onClick={() => {
                  LoginModalRef.current.open();
                }}
              >
                登录
              </Button>
            }
          </Header>
          <Content
            style={{
              padding: '10px',
              overflow: 'auto',
            }}
          >
            <SiderRouters />
          </Content>
        </Layout>
      </Layout>
      <LoginModal modalRef={LoginModalRef} />
    </>
  )
}

export default BaseLayout
