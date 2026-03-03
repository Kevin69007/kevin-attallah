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
}

const props = withDefaults(defineProps<Props>(), {
  selector: ':scope > *',
  stagger: 0.12,
  distance: 50,
})

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!container.value) return
  const { $gsap, $ScrollTrigger } = useNuxtApp()
  if (!$gsap || !$ScrollTrigger) {
    // Fallback: make all children visible
    const children = container.value.querySelectorAll(props.selector)
    children.forEach((child) => {
      ;(child as HTMLElement).style.opacity = '1'
    })
    return
  }

  const children = container.value.querySelectorAll(props.selector)
  if (!children.length) return

  // Set initial state via CSS for predictable behavior
  children.forEach((child) => {
    ;(child as HTMLElement).style.opacity = '0'
    ;(child as HTMLElement).style.willChange = 'transform, opacity'
  })

  const rect = container.value.getBoundingClientRect()
  const inViewport = rect.top < window.innerHeight * 0.95

  const fromVars: Record<string, any> = {
    opacity: 0,
    y: props.distance,
  }

  const toVars: Record<string, any> = {
    opacity: 1,
    y: 0,
    stagger: props.stagger,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      children.forEach((child) => {
        ;(child as HTMLElement).style.willChange = 'auto'
      })
    },
  }

  if (inViewport) {
    $gsap.fromTo(children, fromVars, toVars)
  } else {
    toVars.scrollTrigger = {
      trigger: container.value,
      start: 'top 95%',
      once: true,
    }
    $gsap.fromTo(children, fromVars, toVars)
  }

  // Safety fallback: ensure children are visible after 2.5s
  setTimeout(() => {
    children.forEach((child) => {
      const el = child as HTMLElement
      el.style.willChange = 'auto'
      $gsap.set(child, { opacity: 1, y: 0 })
    })
  }, 2500)
})
</script>
