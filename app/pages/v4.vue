<template>
  <div class="page-v4">
    <WebGLPastel />
    <HeroV4 />
    <div class="scroll-space"></div>
  </div>
</template>

<script setup lang="ts">
import WebGLPastel from '~/components/animation/WebGLPastel.vue'
import HeroV4 from '~/components/sections/v4/HeroV4.vue'

definePageMeta({
  layout: 'v4'
})
</script>

<style scoped>
.page-v4 {
  position: relative;
}
.scroll-space {
  height: 200vh;
}
</style>
