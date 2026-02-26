<template>
  <component :is="tag" ref="el" class="text-split">
    <span
      v-for="(word, wi) in words"
      :key="wi"
      class="text-split__word"
    >
      <span
        v-for="(char, ci) in word.split('')"
        :key="ci"
        class="text-split__char"
      >{{ char }}</span>
      <span v-if="wi < words.length - 1" class="text-split__char">&nbsp;</span>
    </span>
  </component>
</template>

<script setup lang="ts">
interface Props {
  text: string
  tag?: string
  delay?: number
  stagger?: number
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
  delay: 0,
  stagger: 0.03,
})

const el = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))

onMounted(() => {
  if (!el.value) return
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const chars = el.value.querySelectorAll('.text-split__char')

  const rect = el.value.getBoundingClientRect()
  const inViewport = rect.top < window.innerHeight * 0.95

  const animVars: Record<string, any> = {
    opacity: 0,
    y: 40,
    rotateX: -90,
    stagger: props.stagger,
    duration: 0.8,
    delay: props.delay,
    ease: 'power3.out',
  }

  if (!inViewport) {
    animVars.scrollTrigger = {
      trigger: el.value,
      start: 'top 85%',
      once: true,
    }
  }

  $gsap.from(chars, animVars)

  // Safety fallback: ensure text is visible after 4s
  setTimeout(() => {
    chars.forEach((char) => {
      $gsap.set(char, { opacity: 1, y: 0, rotateX: 0 })
    })
  }, 4000)
})
</script>

<style lang="scss" scoped>
.text-split {
  overflow: hidden;

  &__word {
    display: inline-flex;
  }

  &__char {
    display: inline-block;
    will-change: transform, opacity;
  }
}
</style>
