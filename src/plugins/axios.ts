import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'
import { nextTick } from 'vue'
import { useUserStore } from '@/stores'

let userStore: any
nextTick(() => {
  userStore = useUserStore()
})

const errCode = {
  40000: '请求参数错误',
  40001: '请求数据为空',
  40100: '未登录',
  40101: '无权限',
  40301: '访问屏蔽',
  50000: '系统内部异常',
}

// 配置跨域携带cookie
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    message.error(error)
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    const data = response.data
    const msg = data?.msg || errCode[data?.code as keyof typeof errCode]
    if (data.code !== 20000) {
      if (data.code === 40100) {
        userStore.logout()
        router.push('/auth/login')
      }
      if (data.code === 40101) {
        router.push('/403')
      }
      if (msg) {
        message.error(msg)
        throw new Error(msg)
      }
    }
    if (msg) {
      message.success(msg)
    }
    if (data.data === undefined) {
      return data
    }
    return response
  },
  function(error) {
    // 传输层错误
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  },
)
