import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mitt from 'mitt' // vue3的事件总线库
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import './assets/main.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 初始化函数
const Mitt = mitt()
// 挂载到全局
app.config.globalProperties.$Bus = Mitt
// 全局声明
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt
  }
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.use(Antd);

app.mount('#app')
