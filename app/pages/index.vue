<template>
  <div class="page-home-brutal">
    <WebGLBrutalistLight />
    
    <main class="brutal-content-stack">
      <HeroBrutalist />
      <MarqueeBrutalist />
      
      <WhyKevinBrutalist />
      <TunnelTransition text="ENTRE DANS LE SYSTÈME." />

      <TwoPathsBrutalist />
      <TunnelTransition text="ACTIVE LE PROTOCOLE." />

      <HowItWorksBrutalist />
      <TunnelTransition text="DOMINE LE JEU." />

      <TestimonialsBrutalist />
      <TunnelTransition text="DÉVERROUILLE LA MATRICE." />

      <BlogBrutalist />
      <TunnelTransition text="PRENDS LE CONTRÔLE." />
      
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

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
onMounted(() => {
  trackViewContent({ content_name: 'Accueil' })
  trackViewItem({ content_name: 'Accueil' })
  trackConversion()
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
