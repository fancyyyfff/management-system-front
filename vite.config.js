import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 在此处配置图标的路径
      iconDirs:[resolve(process.cwd(),'src/assets/svg')],
      symbolId:'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
