import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getExpiredStorage } from '@/stores'
import { useCookies } from 'vue3-cookies'
import { AuthControllerService, UserControllerService, type UserUpdateDTO, type UserVO } from '@/openapi'

const { cookies } = useCookies()
const expiresTime = 60 * 30 // 自定义过期时间 30 分钟
const expiredStorage = getExpiredStorage(localStorage, expiresTime)
const TOKEN_NAME = 'token'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<UserVO>({})

    async function getUserInfo() {
      userInfo.value = (await UserControllerService.getInfoUsingGet()).data || {}
    }

    async function updateUserInfo(newUserInfo: UserUpdateDTO) {
      const res = (await UserControllerService.updateInfoUsingPost(newUserInfo)).data
      if (res !== true) {
        return false
      }
      await getUserInfo()
      return true
    }

    async function logout() {
      userInfo.value = {}
      cookies.remove(TOKEN_NAME)
      await AuthControllerService.logoutUsingGet()
    }

    return {
      userInfo,
      getUserInfo,
      updateUserInfo,
      logout,
    }
  },
  {
    persist: {
      storage: expiredStorage,
      debug: true,
    },
  },
)
