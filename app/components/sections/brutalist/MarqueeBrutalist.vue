<template>
  <div class="marquee-brutal border-y-2 border-black bg-purple">
    <div class="marquee-brutal__inner" ref="marqueeRef">
      <div v-for="i in 3" :key="i" class="marquee-brutal__content">
        <span>STRATÉGIE IA</span>
        <span class="star">✶</span>
        <span>ACCOMPAGNEMENT 1-TO-1</span>
        <span class="star">✶</span>
        <span>ÉLIGIBLE CPF</span>
        <span class="star">✶</span>
        <span>CROISSANCE RADICALE</span>
        <span class="star">✶</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const marqueeRef = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap || !marqueeRef.value) return
  const gsap = $gsap as any

  // Infinite uniform scrolling ticker tape
  gsap.to(marqueeRef.value, {
    xPercent: -33.3333,
    ease: 'none',
    duration: 10,
    repeat: -1
  })
})
</script>

<style lang="scss" scoped>
.marquee-brutal {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  background: $purple;
  border-top: 3px solid #000;
  border-bottom: 3px solid #000;
  padding: 16px 0;
  position: relative;
  z-index: 20;

  &__inner {
    display: flex;
    width: fit-content;
    white-space: nowrap;
  }

  &__content {
    display: flex;
    align-items: center;
    padding-right: 40px;
    gap: 40px;

    span {
      font-family: $font-mono;
      font-size: 24px;
      font-weight: 700;
      color: #FFF;
      letter-spacing: 0.1em;
    }

    .star {
      color: $orange;
      font-size: 28px;
      line-height: 0;
    }
  }
}

@media (max-width: 640px) {
  .marquee-brutal__content span {
    font-size: 16px;
  }

  .marquee-brutal__content {
    gap: 20px;
    padding-right: 20px;
  }

  .marquee-brutal__content .star {
    font-size: 18px;
  }
}
</style>
