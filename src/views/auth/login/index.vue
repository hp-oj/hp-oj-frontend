<script lang="ts" setup>
import { h, nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { notification } from 'ant-design-vue'
import i18n from '@/locales'
import { SmileOutlined } from '@ant-design/icons-vue'
import { AuthControllerService, type LoginBodyDTO } from '@/openapi'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

const formState = reactive<LoginBodyDTO>({
  username: 'admin',
  password: '123456',
  rememberMe: false,
  code: '0',
  uuid: '',
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

async function login() {
  if (loading.value) {
    return
  }
  loading.value = true
  formRef.value.validate().then(async () => {
    let data: any = null
    try {
      data = (await AuthControllerService.loginUsingPost(formState)).data
    } catch (e) {
      await getCode()
    }
    loading.value = false
    if (data) {
      await userStore.getUserInfo()
      // 获取当前路由的参数, 跳转到指定页面
      const { redirect } = router.currentRoute.value.query
      await router.push((redirect as string) || '/')
      // 显示欢迎信息
      notification.open({
        message: i18n.global.t('app.title'),
        description: i18n.global.t('app.welcome'),
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
      })
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
      class="login-form"
      label-align="left"
    >
      <a-form-item :label="$t('user.login.username')" name="username">
        <a-input v-model:value="formState.username" :placeholder="$t('user.login.placeholder.username')">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item :label="$t('user.login.password')" name="password">
        <a-input-password v-model:value="formState.password" :placeholder="$t('user.login.placeholder.password')">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item v-if="captchaEnabled" :label="$t('user.login.captcha')" name="code">
        <a-row :gutter="16">
          <a-col :span="16" class="gutter-row">
            <a-input v-model:value="formState.code" :placeholder="$t('user.login.placeholder.captcha')">
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

      <div style="display: flex; justify-content: space-between; margin: 20px 0">
        <a-form-item name="rememberMe" no-style>
          <a-checkbox v-model:checked="formState.rememberMe">{{ $t('user.login.remember-me') }}</a-checkbox>
        </a-form-item>
        <router-link to="/auth/register">{{ $t('user.login.forget') }}</router-link>
      </div>

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          style="width: 100%; margin-bottom: 20px"
          type="primary"
          @click.prevent="login"
        >{{ $t('user.login.submit') }}
        </a-button>
        Or
        <router-link to="/auth/register">{{ $t('user.login.nowRegister') }}</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped></style>
