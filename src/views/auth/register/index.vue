<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { AuthControllerService, type RegisterBodyDTO, UserControllerService } from '@/openapi'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

const formState = reactive<RegisterBodyDTO & { rePassword: string, remember: boolean }>({
  username: 'admin',
  nickname: '通用Vue模板',
  email: 'example@em.com',
  password: 'admin123',
  rePassword: 'admin123',
  remember: true,
  code: '0',
  uuid: '',
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  rePassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

async function register() {
  if (loading.value) {
    return
  }
  loading.value = true
  formRef.value.validate().then(async () => {
    let data: any = null
    try {
      data = (await UserControllerService.registerUsingPost(formState)).data
    } catch (e) {
      await getCode()
    }
    loading.value = false
    if (data) {
      await userStore.getUserInfo()
      console.log(userStore.userInfo)
      // 获取当前路由的参数, 跳转到指定页面
      const { redirect } = router.currentRoute.value.query
      await router.push((redirect as string) || '/')
    }
  }).catch(() => {
    loading.value = false
  })
}

async function getCode() {
  const res = (await AuthControllerService.captchaImageUsingGet()).data!
  captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + res.img
    formState.uuid = res.uuid || ''
  }
}

nextTick(() => {
  if (captchaEnabled.value) {
    getCode()
  }
})
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      :label-col="{ span: 5 }"
      :model="formState"
      :rules="rules"
      class="register-form"
      label-align="left"
    >
      <a-form-item :label="$t('user.register.username')" name="username">
        <a-input v-model:value="formState.username" :placeholder="$t('user.register.placeholder.username')">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item :label="$t('user.register.nickname')" name="nickname">
        <a-input v-model:value="formState.nickname" :placeholder="$t('user.register.placeholder.nickname')">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item :label="$t('user.register.email')" name="email">
        <a-input v-model:value="formState.email" :placeholder="$t('user.register.email')">
          <template #prefix>
            <Icon icon="MailOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item :label="$t('user.register.password')" name="password">
        <a-input-password v-model:value="formState.password" :placeholder="$t('user.register.placeholder.password')">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item :label="$t('user.register.confirm')" name="rePassword">
        <a-input-password v-model:value="formState.rePassword" :label="$t('user.register.confirm')">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item v-if="captchaEnabled" :label="$t('user.register.captcha')" name="code">
        <a-row :gutter="16">
          <a-col :span="16" class="gutter-row">
            <a-input v-model:value="formState.code" :placeholder="$t('user.register.placeholder.captcha')">
              <template #prefix>
                <Icon icon="SecurityScanOutlined" />
              </template>
            </a-input>
          </a-col>
          <a-col :span="8" class="gutter-row">
            <img :src="codeUrl" class="getCaptcha" style="cursor: pointer; height: 30px" @click="getCode" />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          style="width: 100%; margin-bottom: 20px"
          type="primary"
          @click="register"
        >{{ $t('user.register.submit') }}
        </a-button>
        Or
        <router-link to="/auth/login">{{ $t('user.register.haveAccount') }}</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped></style>
