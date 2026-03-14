<template>
  <div class="page-v2">
    <WebGLDarkLuxury />
    <HeroV2 />
    <!-- Empty space to allow scrolling and testing the WebGL scroll trigger -->
    <div class="scroll-space"></div>
  </div>
</template>

<script setup lang="ts">
import WebGLDarkLuxury from '~/components/animation/WebGLDarkLuxury.vue'
import HeroV2 from '~/components/sections/v2/HeroV2.vue'

definePageMeta({
  layout: 'v2'
})
</script>

<style scoped>
.page-v2 {
  position: relative;
}
.scroll-space {
  height: 150vh;
}
</style>
