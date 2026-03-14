<template>
  <section class="tunnel-transition">
    <!-- This section is mostly empty space to allow the user to 
         scroll and experience the WebGL background twisting violently -->
    <div class="tunnel-transition__fixed" ref="textRef">
      <h2 class="str-tunnel">ENTER THE SYSTEM.</h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const textRef = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap || !textRef.value) return
  const gsap = $gsap as any

  gsap.to(textRef.value, {
    yPercent: 100,
    rotationZ: 10,
    scale: 0.5,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.tunnel-transition',
      start: 'top center',
      end: 'bottom top',
      scrub: true
    }
  })
})
</script>

<style lang="scss" scoped>
.tunnel-transition {
  height: 150vh; /* Long scroll area to show off the tunnel */
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &__fixed {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
  }
}

.str-tunnel {
  font-family: $font-mono;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #FFF;
  background: #000;
  padding: 10px 30px;
  border: 4px solid #FFF;
  box-shadow: 10px 10px 0px $purple;
  text-transform: uppercase;
  transform: rotate(-5deg);
  display: inline-block;
  white-space: nowrap;
}
</style>
