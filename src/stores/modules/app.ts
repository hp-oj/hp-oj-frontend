import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { theme } from 'ant-design-vue'
import type { primaryColorEnumType } from '@/config/theme.config'
import variables from '@/styles/variables.module.scss'
import { useI18n } from 'vue-i18n'
import { syncAsyncRoute } from '@/router'
import { getExpiredStorage } from '@/stores'

const expiresTime = 60 * 30 // 自定义过期时间 30 分钟
const expiredStorage = getExpiredStorage(localStorage, expiresTime)
/**
 * app 配置 开启持久化
 */
export const useAppStore = defineStore(
  'app',
  () => {
    // 语言
    const locale = ref<'zhCN' | 'enUS'>('zhCN')
    const localeComp = computed(() => {
      const { locale: iLocale } = useI18n()
      iLocale.value = locale.value
      document.documentElement.setAttribute('lang', locale.value.substring(0, 2))
      syncAsyncRoute()
      return locale.value
    })
    // 颜色模式
    const darkModeRef = ref<'dark' | 'light'>('light')
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)') as MediaQueryList

    function handleDarkModeChange() {
      darkMode.value = darkModeQuery.matches ? 'dark' : 'light'
    }

    onMounted(() => {
      handleDarkModeChange()
    })
    darkModeQuery.addEventListener('change', handleDarkModeChange)
    const darkMode = computed({
      get() {
        document.documentElement.setAttribute('data-dark', darkModeRef.value)
        return darkModeRef.value
      },
      set(val) {
        darkModeRef.value = val
        document.documentElement.setAttribute('data-dark', darkModeRef.value)
      },
    })
    // 主题名称
    const themeName = ref<primaryColorEnumType>('origin')
    // 主题配置
    const borderRadius = ref(7)
    const themeConfig = computed(() => {
      document.documentElement.setAttribute('data-theme', themeName.value)
      document.documentElement.style.setProperty('--border-radius', borderRadius.value + 'px')
      // @ts-ignore
      return {
        token: {
          colorPrimary: variables[themeName.value] || '#1890FF',
          colorSuccess: '#1dc779',
          colorWarning: '#ffb302',
          colorError: '#cf4444',
          colorInfo: variables[themeName.value] || '#27ba9b',
          colorBgContainer: darkMode.value === 'light' ? '#ffffff' : '#232323',
          wireframe: true,
          borderRadius: borderRadius, // 直角风格
        },
        algorithm: darkMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }
    })
    return {
      themeName,
      locale,
      localeComp,
      borderRadius,
      themeConfig,
      darkModeRef, // 用于持久化 可怜的computed无法持久化
      darkMode,
    }
  },
  {
    persist: {
      storage: expiredStorage,
      debug: true,
    },
  },
)
