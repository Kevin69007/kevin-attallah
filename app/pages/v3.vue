<template>
  <div class="page-v3">
    <WebGLBrutalist />
    <HeroV3 />
    <div class="scroll-space"></div>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalist from '~/components/animation/WebGLBrutalist.vue'
import HeroV3 from '~/components/sections/v3/HeroV3.vue'

definePageMeta({
  layout: 'v3'
})
</script>

<style scoped>
.page-v3 {
  position: relative;
}
.scroll-space {
  height: 200vh;
}
</style>
