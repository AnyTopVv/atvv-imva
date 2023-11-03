import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8520,
    open: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://10.21.22.100:81',
        changeOrigin: true,
      },
    },
  },
  base: './',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',  // 配置css module驼峰式转换
    },
  }
})