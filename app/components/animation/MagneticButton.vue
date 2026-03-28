<template>
  <div
    ref="el"
    class="magnetic-btn"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  if (!el.value) return
  const { $gsap } = useNuxtApp()
  const rect = el.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2

  $gsap.to(el.value, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.4,
    ease: 'power2.out',
  })
}

function onLeave() {
  if (!el.value) return
  const { $gsap } = useNuxtApp()
  $gsap.to(el.value, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: 'elastic.out(1, 0.3)',
  })
}
</script>

<style lang="scss" scoped>
.magnetic-btn {
  display: inline-block;
  will-change: transform;
}
</style>
