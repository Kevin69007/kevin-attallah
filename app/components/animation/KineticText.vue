<template>
  <component
    :is="tag"
    ref="textRef"
    class="kinetic-text"
    :class="[
      `kinetic-text--${preset}`,
      { 'kinetic-text--ready': isReady }
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

const props = defineProps({
  tag: {
    type: String,
    default: 'h2'
  },
  preset: {
    type: String,
    default: 'chars-up' // chars-up, words-blur, lines-reveal
  },
  delay: {
    type: Number,
    default: 0
  },
  triggerStart: {
    type: String,
    default: 'top 85%'
  }
})

const textRef = ref<HTMLElement | null>(null)
let splitInfo: SplitType | null = null
let animation: gsap.core.Tween | null = null
const isReady = ref(false)

onMounted(() => {
  if (!textRef.value) return

  // 1. Initialize SplitType
  splitInfo = new SplitType(textRef.value, {
    types: 'lines, words, chars',
    tagName: 'span'
  })

  // Set ready so we can show it (prevents FOUC of unsplit text)
  isReady.value = true

  // 2. Setup initial state and GSAP trigger
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: textRef.value,
      start: props.triggerStart,
      toggleActions: 'play none none none'
    },
    delay: props.delay
  })

  if (props.preset === 'chars-up') {
    gsap.set(splitInfo.chars, {
      yPercent: 120,
      opacity: 0,
      rotateZ: 5
    })
    tl.to(splitInfo.chars, {
      yPercent: 0,
      opacity: 1,
      rotateZ: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.03
    })
  } else if (props.preset === 'words-blur') {
    gsap.set(splitInfo.words, {
      opacity: 0,
      filter: 'blur(10px)',
      y: 20
    })
    tl.to(splitInfo.words, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.05
    })
  } else if (props.preset === 'lines-reveal') {
    // Wrap lines in an overflow-hidden mask
    splitInfo.lines?.forEach(line => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })
    
    gsap.set(splitInfo.lines, {
      yPercent: 100
    })
    tl.to(splitInfo.lines, {
      yPercent: 0,
      duration: 1.5,
      ease: 'expo.out',
      stagger: 0.1
    })
  }
})

onBeforeUnmount(() => {
  if (splitInfo) splitInfo.revert()
  if (animation) animation.kill()
})
</script>

<style scoped>
.kinetic-text {
  /* Prevent unstyled flash */
  opacity: 0;
  visibility: hidden;
}

.kinetic-text--ready {
  opacity: 1;
  visibility: visible;
}

/* Base styles for the split spans */
:deep(.char),
:deep(.word),
:deep(.line) {
  display: inline-block;
}
</style>
