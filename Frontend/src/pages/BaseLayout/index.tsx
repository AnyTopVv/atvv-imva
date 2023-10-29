import { Button, Input, Layout, Menu } from 'antd';
import SiderRouters from '@/routes/SiderRoutes';
import { meunItems } from '@/routes/routesConfig';
import type { FC, ReactElement } from 'react';

const { Header, Sider, Content } = Layout;

const BaseLayout: FC = (): ReactElement => {

  return (
    <Layout
      style={{ height: '100%', overflow: 'hidden' }}
    >
      <Sider
        style={{
          overflowY: 'auto',
        }}
        theme='light' trigger={null}
      >
        ATVV-IMVA
        <Menu mode='inline' items={meunItems} />
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
          <Button>登录</Button>
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
  )
}

export default BaseLayout
