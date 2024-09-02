// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
// ElementPlus的导入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// element-plus/icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'
// element-plus/icons
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 国际化
app.use(ElementPlus, {
    locale: zhCn,
  })
  
app.use(router)
// ElementPlus的使用
app.use(ElementPlus)
app.mount('#app')
