import { Button, Input, Layout, Menu, Image } from 'antd';
import SiderRouters from '@/routes/SiderRoutes';
import { meunItems } from '@/routes/routesConfig';
import { useRef, type FC, type ReactElement } from 'react';
import atvvWordsSrc from '@/assets/atvv-words.png';
import { PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/LoginModal';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';

const { Header, Sider, Content } = Layout;

const BaseLayout: FC = (): ReactElement => {
  const isLogin = useAppSelector(selectIsLogin);
  const navigate = useNavigate();
  const LoginModalRef: any = useRef();

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
                <Button type="text" onClick={() => { navigate('/upload') }}>
                  <PlusSquareOutlined />
                  投稿
                </Button> :
                null
            }
            <Button
              type='primary'
              icon={<UserOutlined />}
              onClick={() => {
                LoginModalRef.current.open();
              }}
            >
              登录
            </Button>
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
