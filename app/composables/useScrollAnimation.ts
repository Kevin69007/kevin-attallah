import type { Ref } from 'vue'

export function useReveal(el: Ref<HTMLElement | null>, options: Record<string, any> = {}) {
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.value.style.opacity = '1'
      return
    }

    const { $gsap } = useNuxtApp()
    const { once = false, ...rest } = options

    tween = $gsap.fromTo(
      el.value,
      { opacity: 0, y: 80, scale: 0.97, rotateX: 2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.value,
          start: 'top 85%',
          end: 'bottom top',
          toggleActions: once
            ? 'play none none none'
            : 'play reverse play reverse',
        },
        ...rest,
      },
    )
  })

  onBeforeUnmount(() => {
    if (tween) {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  })
}

export function useParallax(el: Ref<HTMLElement | null>, speed = 0.3) {
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    if (!el.value) return
    const { $gsap } = useNuxtApp()

    tween = $gsap.to(el.value, {
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

  onBeforeUnmount(() => {
    if (tween) {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  })
}

export function useStagger(selector: string, container: Ref<HTMLElement | null>, options: { once?: boolean } = {}) {
  let tween: gsap.core.Tween | null = null

  onMounted(() => {
    if (!container.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const children = container.value.querySelectorAll(selector)
      children.forEach((child) => {
        ;(child as HTMLElement).style.opacity = '1'
      })
      return
    }

    const { $gsap } = useNuxtApp()
    const { once = false } = options

    tween = $gsap.fromTo(
      container.value.querySelectorAll(selector),
      { opacity: 0, y: 60, scale: 0.96, rotateX: 2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.value,
          start: 'top 80%',
          end: 'bottom top',
          toggleActions: once
            ? 'play none none none'
            : 'play reverse play reverse',
        },
      },
    )
  })

  onBeforeUnmount(() => {
    if (tween) {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  })
}
