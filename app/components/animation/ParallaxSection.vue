<template>
  <div ref="el" class="parallax-section">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0.3,
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const { $gsap } = useNuxtApp()

  $gsap.to(el.value, {
    y: () => props.speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: el.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
})
</script>

<style lang="scss" scoped>
.parallax-section {
  will-change: transform;
}
</style>
