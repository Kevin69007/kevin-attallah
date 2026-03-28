<template>
  <div class="marquee" :class="{ 'marquee--paused': isPaused }" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <div class="marquee__track" ref="track">
      <div class="marquee__content">
        <slot />
      </div>
      <div class="marquee__content" aria-hidden="true">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  speed?: number
  direction?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  speed: 30,
  direction: 'left',
})

const isPaused = ref(false)
const track = ref<HTMLElement | null>(null)

// On large monitors, 2 copies may not fill the viewport.
// Clone extra copies so the -50% translateX loop remains seamless.
onMounted(() => {
  nextTick(() => {
    if (!track.value) return
    const firstContent = track.value.querySelector('.marquee__content') as HTMLElement
    if (!firstContent) return

    const contentWidth = firstContent.offsetWidth
    const viewportWidth = window.innerWidth

    if (contentWidth < viewportWidth) {
      // With translateX(-50%), half the total copies must cover the viewport
      const halfNeeded = Math.ceil(viewportWidth / contentWidth)
      const totalNeeded = halfNeeded * 2
      const currentCopies = track.value.children.length

      for (let i = currentCopies; i < totalNeeded; i++) {
        const clone = firstContent.cloneNode(true) as HTMLElement
        clone.setAttribute('aria-hidden', 'true')
        track.value.appendChild(clone)
      }
    }
  })
})
</script>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
  width: 100%;

  &__track {
    display: flex;
    width: max-content;
    animation: marquee v-bind('`${60 / speed}s`') linear infinite;
  }

  &--paused &__track {
    animation-play-state: paused;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 48px;
    padding: 0 24px;
    white-space: nowrap;
  }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
