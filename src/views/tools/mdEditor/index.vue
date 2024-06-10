<script setup lang="ts">
import { ref } from 'vue'
import IMdEditor from '@/components/bytemd/IMdEditor/IMdEditor.vue'
import IMdViewer from '@/components/bytemd/IMdViewer/IMdViewer.vue'
import testMd from './test.md?raw'
const value = ref(testMd)
</script>

<template>
  <div>
    <i-card>
      <i-md-editor v-model:value="value" />
    </i-card>
    <br />
    <i-card>
      <i-md-viewer :value="value" />
    </i-card>
  </div>
</template>

<style scoped lang="scss">

</style>
