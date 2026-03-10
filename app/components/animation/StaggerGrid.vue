<template>
  <div ref="container" class="stagger-grid">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  selector?: string
  stagger?: number
  distance?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selector: ':scope > *',
  stagger: 0.12,
  distance: 50,
  once: false,
})

const container = ref<HTMLElement | null>(null)
const tween = ref<gsap.core.Tween | null>(null)

onMounted(() => {
  if (!container.value) return

  const children = container.value.querySelectorAll(props.selector)
  if (!children.length) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    children.forEach((child) => {
      ;(child as HTMLElement).style.opacity = '1'
    })
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    children.forEach((child) => {
      ;(child as HTMLElement).style.opacity = '1'
    })
    return
  }

  const fromVars: Record<string, any> = {
    opacity: 0,
    y: props.distance,
    scale: 0.96,
    rotateX: 2,
  }

  const toVars: Record<string, any> = {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    stagger: props.stagger,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container.value,
      start: 'top 95%',
      end: 'bottom top',
      toggleActions: props.once
        ? 'play none none none'
        : 'play reverse play reverse',
    },
  }

  tween.value = $gsap.fromTo(children, fromVars, toVars)
})

onBeforeUnmount(() => {
  if (tween.value) {
    tween.value.scrollTrigger?.kill()
    tween.value.kill()
  }
})
</script>

<style scoped>
.stagger-grid {
  perspective: 800px;
}
</style>
