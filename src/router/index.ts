// @ts-nocheck
import { createMemoryHistory, createRouter, createWebHistory, useRouter } from 'vue-router'
// 路由守卫 如果没有token并且不在白名单中则跳转到登录页
import { nextTick, reactive, ref } from 'vue'
import { constantRouterMap, getAsyncRouterMap, type IRouter } from '@/config/router.config'
import { useUserStore } from '@/stores'
import { ACCESS_ENUM, checkAccess } from '@/router/checkAccess.ts'
// 加载进度条
import NProgress from 'nprogress' // 进度条
import '@/components/NProgress/nprogress.scss'

export const asyncRouterMap = ref<IRouter[]>([])
// 将asyncRouterMap添加到constantRouterMap的baseLayout的children中
asyncRouterMap.value = getAsyncRouterMap()
asyncRouterMap.value.forEach((item) => {
  constantRouterMap[0].children.push(item)
})
const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: constantRouterMap,
})

/**
 * 路由权限校验部分
 */

// 进度条自定义样式
NProgress.configure({ showSpinner: false }) // 进度条配置

let userStore
nextTick(() => userStore = useUserStore())

// 将异步路由添加到路由表
export function syncAsyncRoute() {
  const router = useRouter()
  asyncRouterMap.value = getAsyncRouterMap()
  if (userStore) {
    // 递归筛选出符合权限的路由
    const findAccessRouter = (routerMap: IRouter[]) => {
      return routerMap.filter((item) => {
        if (item.children) {
          item.children = findAccessRouter(item.children)
        }
        return checkAccess(userStore.userInfo, item.meta?.role || ACCESS_ENUM.USER)
      })
    }
    asyncRouterMap.value = reactive(findAccessRouter(asyncRouterMap.value))
  }
  if (router?.getRoutes() === undefined) {
    // 将asyncRouterMap添加到constantRouterMap的baseLayout的children中
    asyncRouterMap.value.forEach((item) => {
      constantRouterMap[0].children.push(item)
    })
  } else {
    // 更新路由
    // 1. 删除原有路由
    constantRouterMap[0].children.forEach((item) => {
      router?.removeRoute(item.name)
    })
    // 1.1 删除basicLayout
    const basicLayout = router?.getRoutes().find((item) => item.name === 'basicLayout')
    basicLayout.children = []
    router?.removeRoute(constantRouterMap[0].name)
    // console.log(router?.getRoutes())
    // 2. 添加新路由
    // 2.1 将asyncRouterMap添加到constantRouterMap的baseLayout的children中
    constantRouterMap[0].children = []
    asyncRouterMap.value.forEach((item) => {
      constantRouterMap[0].children.push(item)
    })
    // 2.2 添加新路由
    asyncRouterMap.value.forEach((item) => {
      router?.addRoute(item)
    })
    // 2.3 添加路由到basicLayout的children中
    asyncRouterMap.value.forEach((item) => {
      basicLayout?.children.push(item)
    })
    router?.addRoute(basicLayout)
  }
}

router.beforeEach((to: any, from: any, next: any) => {
  syncAsyncRoute()
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 需要登录权限
  if (to.meta.requireAuth) {
    if (Object.keys(userStore.userInfo).length > 0) {
      // 判断是否有权限
      if (!to.meta.role) {
        next()
      } else if (!checkAccess(userStore.userInfo, to.meta.role)) {
        // 无权限
        next({ path: '/403' })
      } else {
        next()
      }
    } else {
      next({
        path: '/auth/login',
        // 在login中使用redirect参数跳转到登录前的页面
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})


export default router
