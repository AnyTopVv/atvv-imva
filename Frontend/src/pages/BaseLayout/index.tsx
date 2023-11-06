import { Button, Layout, Menu, Image, Avatar, Popover, Switch } from 'antd';
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
import { SunIcon, MoonIcon } from '@/assets/svgs'

const { Header, Sider, Content } = Layout;

const BaseLayout: FC = (): ReactElement => {
  const isLogin = useAppSelector(selectIsLogin);
  const username = useAppSelector(selectUsername);
  const avatar = useAppSelector(selectUserAvatar);
  const navigate = useNavigate();
  const loginModalRef: any = useRef();

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
            backgroundColor: '#f4f1fc',
          }}
          theme='light' trigger={null} width={150}
        >
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Image alt="ATVV-IMVA" preview={false} src={atvvWordsSrc} />
          </div>
          <Menu mode='inline' items={meunItems} style={{ padding: '5px', backgroundColor: 'transparent', fontSize: '16px', color: '#474747' }} />
        </Sider>
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '8%',
              lineHeight: '8%',
              fontSize: '20px',
              borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
              backgroundColor: '#f4f1fc'
            }}
          >
            {/* <Input.Search></Input.Search> */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse', verticalAlign: 'middle' }} >
              {username ?
                avatar ?
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
                      <Avatar size={52} src={avatar} />
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
                      <Avatar style={{ backgroundColor: '#776ce9', verticalAlign: 'middle' }} size={52} >{username}</Avatar>
                    </div>
                  </Popover> :
                <div style={{ height: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Button
                    type='primary'
                    icon={<UserOutlined />}
                    onClick={() => {
                      loginModalRef.current.open();
                    }}
                  >
                    登录
                  </Button>
                </div>
              }
              {
                isLogin ?
                  <Button style={{ height: '52px' }} type="text" onClick={() => { navigate('/upload') }}>
                    <PlusSquareOutlined />
                    <div>投稿</div>
                  </Button> :
                  null
              }
              <div style={{ height: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: "10px" }}>
                <Switch
                  checkedChildren={<MoonIcon />}
                  unCheckedChildren={<SunIcon />}
                  defaultChecked
                />
              </div>
            </div>
          </Header>
          <Content
            style={{
              padding: '10px',
              overflow: 'auto',
              // backgroundColor: '#f4f1fc',
              backgroundColor: '#f4f1fc',
            }}
          >
            <SiderRouters loginModalRef={loginModalRef} />
          </Content>
        </Layout>
      </Layout >
      <LoginModal modalRef={loginModalRef} />
    </>
  )
}

export default BaseLayout
