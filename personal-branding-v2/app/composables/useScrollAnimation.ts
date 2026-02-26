import type { Ref } from 'vue'

export function useReveal(el: Ref<HTMLElement | null>, options: Record<string, any> = {}) {
  onMounted(() => {
    if (!el.value) return
    const { $gsap, $ScrollTrigger } = useNuxtApp()

    $gsap.from(el.value, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.value,
        start: 'top 85%',
        once: true,
      },
      ...options,
    })
  })
}

export function useParallax(el: Ref<HTMLElement | null>, speed = 0.3) {
  onMounted(() => {
    if (!el.value) return
    const { $gsap } = useNuxtApp()

    $gsap.to(el.value, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export function useStagger(selector: string, container: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!container.value) return
    const { $gsap } = useNuxtApp()

    $gsap.from(container.value.querySelectorAll(selector), {
      opacity: 0,
      y: 60,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.value,
        start: 'top 80%',
      },
    })
  })
}
