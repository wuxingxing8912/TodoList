import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 开发/构建配置
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 路径别名：@ 指向 src 目录
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
