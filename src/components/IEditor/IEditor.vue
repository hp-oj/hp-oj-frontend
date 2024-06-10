<script setup lang="ts">
import { shallowRef } from 'vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:code'])
defineExpose({ formatCode })
const props = withDefaults(defineProps<{
  code: string
  theme?: string
  language: string
  options?: any
}>(), {
  code: '',
  theme: 'vs-dark',
  language: 'javascript',
  options: {
    lineNumbersMinChars: 3,
    minimap: {
      enabled: false,
    },
  },
})
const propsCode = useVModel(props, 'code', emit)

const editorRef = shallowRef()
const handleMount = (editor: HTMLElement) => (editorRef.value = editor)

/**
 * 格式化代码
 */
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>

<template>
  <div class="i-editor">
    <vue-monaco-editor
      v-bind="$attrs"
      v-model:value="propsCode"
      :theme="theme"
      :language="language"
      :options="options"
      @mount="handleMount"
    />
  </div>
</template>

<style scoped lang="scss">
.i-editor {
  height: 500px;
}
</style>
