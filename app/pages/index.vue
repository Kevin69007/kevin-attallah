<template>
  <div class="page-home-brutal">
    <WebGLBrutalistLight />
    
    <main class="brutal-content-stack">
      <HeroBrutalist />
      <MarqueeBrutalist />
      
      <WhyKevinBrutalist />
      <TunnelTransition />

      <TwoPathsBrutalist />
      <TunnelTransition text="ACTIVATE THE PROTOCOL." />

      <HowItWorksBrutalist />
      <TunnelTransition text="DOMINATE THE GAME." />

      <TestimonialsBrutalist />
      <TunnelTransition text="UNLOCK THE MATRIX." />

      <BlogBrutalist />
      <TunnelTransition text="OWN THE SYSTEM." />
      
      <CTABrutalist />
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import HeroBrutalist from '~/components/sections/brutalist/HeroBrutalist.vue'
import MarqueeBrutalist from '~/components/sections/brutalist/MarqueeBrutalist.vue'
import WhyKevinBrutalist from '~/components/sections/brutalist/WhyKevinBrutalist.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'
import TwoPathsBrutalist from '~/components/sections/brutalist/TwoPathsBrutalist.vue'
import HowItWorksBrutalist from '~/components/sections/brutalist/HowItWorksBrutalist.vue'
import TestimonialsBrutalist from '~/components/sections/brutalist/TestimonialsBrutalist.vue'
import BlogBrutalist from '~/components/sections/brutalist/BlogBrutalist.vue'
import CTABrutalist from '~/components/sections/brutalist/CTABrutalist.vue'

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.page-home-brutal {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}
</style>
