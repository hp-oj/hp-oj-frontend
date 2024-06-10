<script lang="ts" setup></script>

<template>
  <div class="i-background"></div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.png') center center no-repeat;
  background-size: cover;
  z-index: -1;
  overflow: hidden;
}
</style>
