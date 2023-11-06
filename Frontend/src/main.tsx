import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { App as AntdApp } from 'antd'
// import 'nprogress/nprogress.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'
import { ConfigProvider, ThemeConfig, theme } from 'antd'
import '@/css/index.less'
import { FC } from 'react'

const RootNode: FC = () => {

  // 定制主题
  const globalTheme: ThemeConfig = {
    token: {
      colorPrimary: '#776ce9',
    },
    algorithm: theme.defaultAlgorithm,
  }

  return (
    <ConfigProvider theme={globalTheme}>
      <AntdApp style={{ height: '100%' }}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AntdApp>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootNode />
)
