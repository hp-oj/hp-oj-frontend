// @ts-nocheck
import '@/styles/style.scss'
import '@/styles/common.scss'
// 这个需要再安装一个bytemd
import 'bytemd/dist/index.css'
import { createApp } from 'vue'
import App from '@/App.vue'
// 引入andv icon
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import pinia from '@/stores'
import router from '@/router'
// axios拦截器
import '@/plugins/axios'
// 国际化
import i18n from '@/locales'
// 过渡动画
import VueTransitions from '@morev/vue-transitions'
import '@morev/vue-transitions/styles'
// monaco editor
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
// 高德地图
import { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'

// 初始化vue-amap
initAMapApiLoader({
  // 高德的key
  key: '410807074b37e182410b296f03e67c2a',
  securityJsCode: '180c94c4fba4aae49383fef2161ab6a1', // 新版key需要配合安全密钥使用
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueTransitions)
app.use(VueMonacoEditorPlugin, {
  paths: {
    vs: 'https://cdn.staticfile.net/monaco-editor/0.45.0/min/vs',
  },
})
app.component(Icon)
// 注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

app.mount('#app')
