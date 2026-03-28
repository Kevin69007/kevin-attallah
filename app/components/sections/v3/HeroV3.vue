<template>
  <section class="hero-v3">
    <div class="container hero-v3__grid">
      <div class="hero-v3__content" ref="contentRef">
        <!-- Using native oversized font styles -->
        <h1 class="hero-v3__title">
          <span class="block line-1">NOUS NE</span>
          <span class="block line-2">SUIVONS PAS</span>
          <span class="block line-3">LE MARCHÉ.</span>
        </h1>
        
        <p class="hero-v3__subtitle">
          CRÉEZ, SCALAZ, DOMINEZ. L'IA ET L'ENTREPRENEURIAT <br>SANS FILTRE. SANS LIMITES.
        </p>

        <button class="btn-brutal" ref="btnRef">
          [ DÉMARRER_ ]
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const contentRef = ref(null)
const btnRef = ref(null)

const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  // Harsh, aggressive entrance
  gsap.from('.block', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.2
  })

  gsap.from('.hero-v3__subtitle', {
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    duration: 1,
    delay: 0.8,
    ease: 'expo.out'
  })
  gsap.to('.hero-v3__subtitle', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    delay: 0.8,
    ease: 'expo.out'
  })
})
</script>

<style lang="scss" scoped>
.hero-v3 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  padding-top: 100px;
  overflow: hidden;

  &__content {
    width: 100%;
  }

  &__title {
    font-size: clamp(4rem, 12vw, 12rem);
    font-weight: 900;
    line-height: 0.85;
    letter-spacing: -0.06em;
    margin-bottom: 40px;
    color: #FFFFFF;
    text-transform: uppercase;
    
    .block {
      display: block;
      will-change: transform, opacity;
    }

    .line-2 {
      color: transparent;
      -webkit-text-stroke: 2px #fff;
    }
  }

  &__subtitle {
    font-family: monospace;
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: #00FF00; /* Harsh hacker green accent */
    max-width: 600px;
    margin-bottom: 60px;
    letter-spacing: 0em;
    text-transform: uppercase;
    font-weight: bold;
    // clip-path is animated via GSAP
  }

  .btn-brutal {
    background: #FFFFFF;
    color: #000000;
    font-family: monospace;
    font-size: 1.5rem;
    font-weight: 900;
    border: none;
    padding: 24px 48px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.1s;
    
    &:hover {
      background: #00FF00;
      color: #000;
      transform: translate(8px, -8px);
      box-shadow: -8px 8px 0px #fff;
    }
    
    &:active {
      transform: translate(0, 0);
      box-shadow: 0 0 0 #fff;
    }
  }
}
</style>
