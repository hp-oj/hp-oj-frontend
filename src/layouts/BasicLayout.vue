<script lang="ts" setup>
import ILayout from '@/layouts/components/ILayout/ILayout.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/stores'

onBeforeMount(async () => {
  await useUserStore().getUserInfo()
})
</script>
<template>
  <i-layout>
    <router-view v-slot="{ Component }">
      <transition-slide :offset="[-16, 0]" mode="out-in">
        <component :is="Component" />
      </transition-slide>
    </router-view>
  </i-layout>
</template>

<style lang="scss" scoped></style>
