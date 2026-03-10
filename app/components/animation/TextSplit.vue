<template>
  <component :is="tag" ref="el" class="text-split">
    <span
      v-for="(word, wi) in words"
      :key="wi"
      class="text-split__word"
      :class="{ 'text-split__word--gradient': gradientWordIndices.has(wi) }"
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
  gradientText?: string
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
  delay: 0,
  stagger: 0.03,
  gradientText: '',
  once: false,
})

const el = ref<HTMLElement | null>(null)
const tween = ref<gsap.core.Tween | null>(null)
const words = computed(() => props.text.split(' '))

const gradientWordIndices = computed(() => {
  if (!props.gradientText) return new Set<number>()
  const startIdx = props.text.indexOf(props.gradientText)
  if (startIdx === -1) return new Set<number>()
  const endIdx = startIdx + props.gradientText.length

  const indices = new Set<number>()
  let charPos = 0
  for (let i = 0; i < words.value.length; i++) {
    const wordEnd = charPos + words.value[i].length
    if (wordEnd > startIdx && charPos < endIdx) {
      indices.add(i)
    }
    charPos = wordEnd + 1
  }
  return indices
})

onMounted(() => {
  if (!el.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const chars = el.value.querySelectorAll('.text-split__char')
    chars.forEach((char) => {
      ;(char as HTMLElement).style.opacity = '1'
    })
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) return

  const chars = el.value.querySelectorAll('.text-split__char')

  const fromVars: Record<string, any> = {
    opacity: 0,
    y: 40,
    rotateX: -90,
    scale: 0.8,
  }

  const toVars: Record<string, any> = {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    stagger: props.stagger,
    duration: 0.8,
    delay: props.delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el.value,
      start: 'top 85%',
      end: 'bottom top',
      toggleActions: props.once
        ? 'play none none none'
        : 'play reverse play reverse',
    },
  }

  tween.value = $gsap.fromTo(chars, fromVars, toVars)
})

onBeforeUnmount(() => {
  if (tween.value) {
    tween.value.scrollTrigger?.kill()
    tween.value.kill()
  }
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
  }

  &__word--gradient {
    background: linear-gradient(135deg, $purple, $orange);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
