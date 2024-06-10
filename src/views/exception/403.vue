<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <a-result status="403" :title="$t('exception.403.title')" :sub-title="$t('exception.403.description')">
      <template #extra>
        <a-button type="primary">
          <router-link to="/">{{ $t('exception.403.back-home') }}</router-link>
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
