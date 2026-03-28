<template>
  <div ref="el" class="scroll-reveal">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up',
  delay: 0,
  duration: 1.2,
  distance: 60,
  once: false,
})

const el = ref<HTMLElement | null>(null)
const tween = ref<gsap.core.Tween | null>(null)

onMounted(() => {
  if (!el.value) return

  // Reduced motion: show immediately, no animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.value.style.opacity = '1'
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    el.value.style.opacity = '1'
    return
  }

  const fromVars: Record<string, any> = { opacity: 0 }

  switch (props.direction) {
    case 'up':
      fromVars.y = props.distance
      fromVars.scale = 0.97
      fromVars.rotateX = 2
      break
    case 'down':
      fromVars.y = -props.distance
      fromVars.scale = 0.97
      fromVars.rotateX = -2
      break
    case 'left':
      fromVars.x = props.distance
      fromVars.scale = 0.97
      fromVars.rotateY = -2
      break
    case 'right':
      fromVars.x = -props.distance
      fromVars.scale = 0.97
      fromVars.rotateY = 2
      break
    case 'scale':
      fromVars.scale = 0.85
      fromVars.rotateX = 3
      break
  }

  const toVars: Record<string, any> = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    duration: props.duration,
    delay: props.delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el.value,
      start: 'top 95%',
      end: 'bottom top',
      toggleActions: props.once
        ? 'play none none none'
        : 'play reverse play reverse',
    },
  }

  tween.value = $gsap.fromTo(el.value, fromVars, toVars)
})

onBeforeUnmount(() => {
  if (tween.value) {
    tween.value.scrollTrigger?.kill()
    tween.value.kill()
  }
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  perspective: 800px;
}
</style>
