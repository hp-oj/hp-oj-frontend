import BasicLayout from '@/layouts/BasicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import i18n from '@/locales'
import { ACCESS_ENUM } from '@/router/checkAccess.ts'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    redirect: '/dashboard',
    component: BasicLayout,
    children: [],
  },
  {
    name: 'authLayout',
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        name: 'login',
        path: '/auth/login',
        meta: {
          title: '登录',
        },
        component: () => import('@/views/auth/login/index.vue'),
      },
      {
        name: 'register',
        path: '/auth/register',
        meta: {
          title: '注册',
        },
        component: () => import('@/views/auth/register/index.vue'),
      },
    ],
  },
  {
    name: '403',
    path: '/403',
    hidden: true,
    meta: {
      title: '403',
    },
    component: () => import('@/views/exception/403.vue'),
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    hidden: true,
    meta: {
      title: '404',
    },
    component: () => import('@/views/exception/404.vue'),
  },
]

export interface IRouterMeta {
  icon: string
  title: string
  requireAuth?: boolean
  role?: 'ban' | 'user' | 'admin'
  hidden?: boolean
}

export interface IRouter {
  name: string
  path: string
  meta: IRouterMeta
  component?: any
  children?: IRouter[]
}

export function getAsyncRouterMap(): IRouter[] {
  return [
    {
      name: i18n.global?.t('menu.dashboard'),
      path: '/dashboard',
      meta: {
        icon: 'HomeOutlined',
        title: '首页',
        requireAuth: true,
      },
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      name: '题目',
      path: '/question',
      meta: {
        icon: 'QuestionCircleOutlined',
        title: '题目',
        requireAuth: true,
      },
      children: [
        {
          name: '新增题目',
          path: '/question/add',
          meta: {
            icon: 'PlusCircleOutlined',
            title: '新增题目',
            requireAuth: true,
            role: ACCESS_ENUM.ADMIN,
          },
          component: () => import('@/views/question/add/index.vue'),
        },
        {
          name: '管理题目',
          path: '/question/manage',
          meta: {
            icon: 'EditOutlined',
            title: '管理题目',
            requireAuth: true,
            role: ACCESS_ENUM.ADMIN,
          },
          component: () => import('@/views/question/manage/index.vue'),
        },
        {
          name: '浏览题目',
          path: '/question/list',
          meta: {
            icon: 'UnorderedListOutlined',
            title: '浏览题目',
            requireAuth: true,
          },
          component: () => import('@/views/question/list/index.vue'),
        },
        {
          name: '提交题目',
          path: '/question/submit',
          meta: {
            icon: 'EditOutlined',
            title: '提交题目',
            requireAuth: true,
            hidden: true,
          },
          component: () => import('@/views/question/submit/index.vue'),
        },
        {
          name: '提交记录',
          path: '/question/submit/list',
          meta: {
            icon: 'UnorderedListOutlined',
            title: '提交记录',
            requireAuth: true,
          },
          component: () => import('@/views/question/submitList/index.vue'),
        },
      ],
    },
    {
      name: i18n.global?.t('menu.user-center'),
      path: '/userCenter',
      meta: {
        icon: 'UserOutlined',
        title: '个人中心',
        requireAuth: true,
      },
      component: () => import('@/views/user/center/index.vue'),
    },
    {
      name: i18n.global?.t('menu.tools'),
      path: '/tools',
      meta: {
        icon: 'AppstoreOutlined',
        title: '工具',
        requireAuth: true,
      },
      children: [
        {
          name: '图表',
          path: '/charts',
          meta: {
            icon: 'BarChartOutlined',
            title: '图表',
            requireAuth: true,
          },
          component: () => import('@/views/tools/charts/index.vue'),
        },
        {
          name: '编辑器',
          path: '/editor',
          meta: {
            icon: 'FontSizeOutlined',
            title: '编辑器',
            requireAuth: true,
          },
          component: () => import('@/views/tools/editor/index.vue'),
        },
        {
          name: 'Markdown编辑器',
          path: '/mdEditor',
          meta: {
            icon: 'FontSizeOutlined',
            title: 'Markdown编辑器',
            requireAuth: true,
          },
          component: () => import('@/views/tools/mdEditor/index.vue'),
        },
        {
          name: '地图',
          path: '/map',
          meta: {
            icon: 'FontSizeOutlined',
            title: '地图',
            requireAuth: true,
          },
          component: () => import('@/views/tools/map/index.vue'),
        },
        {
          name: '大屏',
          path: '/largeScreen',
          meta: {
            icon: 'DesktopOutlined',
            title: '大屏',
            requireAuth: true,
            role: ACCESS_ENUM.ADMIN,
          },
          component: () => import('@/views/tools/largeScreen/index.vue'),
        },
      ],
    },
  ]
}
