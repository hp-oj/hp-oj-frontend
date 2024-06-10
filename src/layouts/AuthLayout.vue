<script lang="ts" setup>
import IBackground from '@/layouts/components/IBackground/IBackground.vue'
import { ref, watch } from 'vue'
import router from '@/router'
import { useAppStore } from '@/stores'
import { getAssetsFile } from '@/utils/utils.ts'

const appStore = useAppStore()
// const mobile = ref(window.innerWidth < 768)
const activeKey = ref(router.currentRoute.value.name)
const iBackgroundRef = ref<any>(null)

function handleTabsChange() {
  if (activeKey.value === 'login') {
    router.push('/auth/login')
  } else {
    router.push('/auth/register')
  }
}

// 监听路由变化
watch(
  () => router.currentRoute.value.name,
  (val) => {
    activeKey.value = val
  },
)
</script>

<template>
  <div class="i-auth-layout">
    <a-config-provider>
      <i-background ref="iBackgroundRef" />
      <div class="i-auth-layout__container">
        <div class="i-auth-layout__container--logo">
          <div class="top">
            <div class="left">
              <img
                :src="
                  appStore.darkMode == 'light'
                    ? getAssetsFile('images/logo-blue.png')
                    : getAssetsFile('images/logo-white.png')
                "
                :style="{ height: '64px' }"
                alt=""
              />
            </div>
            <div class="right">
              <div class="title">{{ $t('app.title') }}</div>
            </div>
          </div>
          <div class="bottom">
            <div class="desc">{{$t('app.welcome')}}</div>
          </div>
        </div>
        <div class="i-auth-layout__container--top">
          <a-tabs
            v-model:active-key="activeKey"
            :tab-bar-gutter="150"
            class="i-auth-layout__container--tabs"
            @change="handleTabsChange"
          >
            <a-tab-pane key="login" :tab="$t('user.login.title')" />
            <a-tab-pane key="register" :tab="$t('user.register.title')" />
          </a-tabs>
        </div>
        <router-view v-slot="{ Component }" class="i-auth-layout__container--form">
          <transition-slide :offset="[-16, 0]" mode="out-in">
            <component :is="Component" />
          </transition-slide>
        </router-view>
      </div>
    </a-config-provider>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-auth-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  max-width: 100vw;

  .i-auth-layout__container {
    position: relative;
    width: 470px;
    margin: 0 auto;
    padding: 10px;
    border-radius: var(--border-radius); // 圆角
    overflow: hidden;
    //box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    //background: #ffffff;
    transition: background 0.3s ease-in-out;

    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: 100vw;
      height: 100%;
      left: 0;
      border-radius: 0;
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
      @include useTheme {
        background: getModeVar('cardBgColor');
      }
    }

    .i-auth-layout__container--logo {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;

      @media screen and (max-width: 768px) {
        //display: none;
      }

      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;

        .left {
          img {
            height: 64px;
            width: 64px;
            object-fit: cover;
            object-position: left center;
          }
        }

        .right {
          .title {
            font-size: 24px;
            font-weight: 600;
            color: var(--primary-color);
            margin-left: 10px;
          }
        }
      }

      .bottom {
        .desc {
          font-size: 14px;
          color: var(--text-color);
          text-align: center;
        }
      }
    }

    .i-auth-layout__container--form {
      padding: 20px 20px 30px 20px;

      @media screen and (max-width: 768px) {
        padding: 20px;
      }
    }
  }
}

//修改ant-design样式
:deep(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap) {
  display: flex !important;
  justify-content: center !important;
}

:deep(.ant-tabs .ant-tabs-tab .ant-tabs-tab-btn) {
  font-size: 20px !important;
  @media screen and (max-width: 768px) {
    font-size: 16px !important;
  }
}
</style>
