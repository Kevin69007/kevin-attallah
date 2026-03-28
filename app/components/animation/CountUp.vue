<template>
  <span ref="el">{{ prefix }}{{ displayValue }}{{ suffix }}</span>
</template>

<script setup lang="ts">
interface Props {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2,
  suffix: '',
  prefix: '',
  once: false,
})

const el = ref<HTMLElement | null>(null)
const displayValue = ref(0)
let currentTween: gsap.core.Tween | null = null
let scrollTriggerInstance: ScrollTrigger | null = null

onMounted(() => {
  if (!el.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayValue.value = props.end
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    displayValue.value = props.end
    return
  }

  const obj = { val: 0 }

  function playForward() {
    if (currentTween) currentTween.kill()
    currentTween = $gsap.to(obj, {
      val: props.end,
      duration: props.duration,
      ease: 'power2.out',
      onUpdate: () => {
        displayValue.value = Math.round(obj.val)
      },
    })
  }

  function playReverse() {
    if (currentTween) currentTween.kill()
    currentTween = $gsap.to(obj, {
      val: 0,
      duration: props.duration * 0.6,
      ease: 'power2.in',
      onUpdate: () => {
        displayValue.value = Math.round(obj.val)
      },
    })
  }

  const triggerConfig: Record<string, any> = {
    trigger: el.value,
    start: 'top 92%',
    end: 'bottom top',
  }

  if (props.once) {
    triggerConfig.once = true
    triggerConfig.onEnter = () => playForward()
  } else {
    triggerConfig.onEnter = () => playForward()
    triggerConfig.onEnterBack = () => playForward()
    triggerConfig.onLeave = () => playReverse()
    triggerConfig.onLeaveBack = () => playReverse()
  }

  scrollTriggerInstance = $ScrollTrigger.create(triggerConfig)

  // If already in viewport, play immediately
  const rect = el.value.getBoundingClientRect()
  if (rect.top < window.innerHeight * 0.92) {
    playForward()
  }
})

onBeforeUnmount(() => {
  if (currentTween) currentTween.kill()
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>
