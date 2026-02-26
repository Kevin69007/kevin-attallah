<template>
  <span ref="el">{{ prefix }}{{ displayValue }}{{ suffix }}</span>
</template>

<script setup lang="ts">
interface Props {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2,
  suffix: '',
  prefix: '',
})

const el = ref<HTMLElement | null>(null)
const displayValue = ref(0)

onMounted(() => {
  if (!el.value) return
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    displayValue.value = props.end
    return
  }

  const obj = { val: 0 }

  const rect = el.value.getBoundingClientRect()
  const inViewport = rect.top < window.innerHeight * 0.95

  const animVars: Record<string, any> = {
    val: props.end,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: () => {
      displayValue.value = Math.round(obj.val)
    },
  }

  if (!inViewport) {
    animVars.scrollTrigger = {
      trigger: el.value,
      start: 'top 92%',
      once: true,
    }
  }

  $gsap.to(obj, animVars)

  // Safety fallback: show final value after 5s if animation hasn't triggered
  setTimeout(() => {
    if (displayValue.value === 0 && props.end > 0) {
      displayValue.value = props.end
    }
  }, 5000)
})
</script>
