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
  once: true,
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    // Fallback: make content visible if GSAP unavailable
    el.value.classList.add('scroll-reveal--visible')
    return
  }

  const fromVars: Record<string, any> = { opacity: 0 }
  const toVars: Record<string, any> = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: props.duration,
    delay: props.delay,
    ease: 'power3.out',
    onComplete: () => {
      if (el.value) el.value.classList.add('scroll-reveal--visible')
    },
  }

  switch (props.direction) {
    case 'up': fromVars.y = props.distance; break
    case 'down': fromVars.y = -props.distance; break
    case 'left': fromVars.x = props.distance; break
    case 'right': fromVars.x = -props.distance; break
    case 'scale': fromVars.scale = 0.85; break
  }

  // Check if element is already in viewport — animate immediately
  const rect = el.value.getBoundingClientRect()
  const inViewport = rect.top < window.innerHeight * 0.95

  if (inViewport) {
    $gsap.fromTo(el.value, fromVars, toVars)
  } else {
    toVars.scrollTrigger = {
      trigger: el.value,
      start: 'top 95%',
      once: props.once,
    }
    $gsap.fromTo(el.value, fromVars, toVars)
  }

  // Safety fallback: ensure content is visible after 2.5s no matter what
  setTimeout(() => {
    if (el.value) {
      el.value.classList.add('scroll-reveal--visible')
      $gsap.set(el.value, { opacity: 1, x: 0, y: 0, scale: 1 })
    }
  }, 2500)
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  will-change: transform, opacity;
}
.scroll-reveal--visible {
  opacity: 1 !important;
  transform: none !important;
  will-change: auto;
}
</style>
