<template>
  <Editor :value="value" :plugins="plugins" :locale="locales[localeKey]" @change="handleChange" />
</template>

<script setup lang="ts">
import math from '@bytemd/plugin-math'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import mediumZoom from '@bytemd/plugin-medium-zoom'
// import mermaid from '@bytemd/plugin-mermaid'
import frontmatter from '@bytemd/plugin-frontmatter'
import theme from '../plugin-theme/index'
// @ts-ignore
import { Editor } from '@bytemd/vue-next'

const emit = defineEmits(['update:value'])
defineProps<{ value: string }>()

function handleChange(v: string) {
  emit('update:value', v)
}

function stripPrefixes(obj: Record<string, any>) {
  return Object.entries(obj).reduce((p, [key, value]) => {
    p[key.split('/').slice(-1)[0].replace('.json', '')] = value
    // console.log(p)
    return p
  }, {} as Record<string, any>)
}

const locales = stripPrefixes(
  import.meta.glob('/node_modules/bytemd/locales/*.json', { eager: true }),
)
const gfmLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-gfm/locales/*.json', {
    eager: true,
  }),
)
const mathLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-math/locales/*.json', {
    eager: true,
  }),
)
const mermaidLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-mermaid/locales/*.json', {
    eager: true,
  }),
)
const localeKey = 'zh_Hans'
const plugins = [
  highlight(),
  frontmatter(),
  math({
    locale: mathLocales[localeKey],
    katexOptions: { output: 'mathml' }, // https://github.com/KaTeX/KaTeX/issues/2796
  }),
  gfm({
    locale: gfmLocales[localeKey],
  }),
  mediumZoom(),
  // mermaid({
  //   locale: mermaidLocales[localeKey],
  // }),
  theme({
    theme: 'juejin', // 默认掘金主题
    highlight: 'github', // 默认代码高亮样式
  }),
]


</script>

<style lang="scss">
.bytemd {
  position: relative;
  height: 50vh;
  z-index: 99;
}

.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
