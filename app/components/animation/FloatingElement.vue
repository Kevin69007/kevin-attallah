<template>
  <div ref="el" class="floating-el">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  amplitude?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  amplitude: 20,
  duration: 4,
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const { $gsap } = useNuxtApp()

  $gsap.to(el.value, {
    y: props.amplitude,
    duration: props.duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
})
</script>

<style lang="scss" scoped>
.floating-el {
  will-change: transform;
}
</style>
