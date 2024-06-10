<script setup lang="ts">
import { onMounted, ref } from 'vue'

const position = ref([0, 0])

const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      position.value[0] = pos.coords.longitude
      position.value[1] = pos.coords.latitude
      console.log(position.value)
    })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

onMounted(getPosition)
</script>

<template>
  <div>
    <i-map :position="position" style="height: 80vh" />
  </div>
</template>

<style scoped lang="scss">

</style>
