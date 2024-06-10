<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useAppStore } from '@/stores'


const props = withDefaults(
  defineProps<{
    position: [number, number]
    viewMode?: '2D' | '3D'
  }>(),
  {
    position: () => [116.397428, 39.997245],
    viewMode: '3D',
  },
)

const appStore = useAppStore()

let map: any = null

function init(amap: any) {
  map = amap
}

function clickMarker() {
  // 地图居中
  map.setCenter([props.position[0], props.position[1]])
  map.setZoom(18)
}

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div class="i-map">
    <el-amap
      :center="position"
      :zoom="18"
      :zooms="[12, 19]"
      :pitch="50"
      :rotation="-15"
      :view-mode="viewMode"
      :map-style="appStore.darkMode === 'dark' ? 'amap://styles/dark' : 'amap://styles/normal'"
      terrain
      @init="init"
    >
      <el-amap-marker :position="position" :offset="[-10, -34]" @click="clickMarker">
        <div class="custom-content-marker">
          <img src="https://a.amap.com/jsapi/static/image/plugin/marker_red.png" />
        </div>
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<style lang="scss">
@import './style.scss';

.i-map {
  @apply relative w-full h-full;
}
</style>
