import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { App as AntdApp } from 'antd'
// import 'nprogress/nprogress.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'
import { ConfigProvider, ThemeConfig } from 'antd'
import '@/css/index.less'

// 定制主题
const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme}>
    <AntdApp style={{ height: '100%' }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AntdApp>
  </ConfigProvider>,
)
