export default defineNuxtPlugin((nuxtApp) => {
  const gsap = nuxtApp.$gsap as any
  if (!gsap) return

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el: HTMLElement, binding) {
      // Skip on touch devices
      if (
        'ontouchstart' in window
        || navigator.maxTouchPoints > 0
        || window.matchMedia('(hover: none)').matches
      ) return

      const strength = typeof binding.value === 'number' ? binding.value : 0.3
      if (strength === 0) return

      el.setAttribute('data-magnetic', '')
      el.style.willChange = 'transform'

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)',
        })
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      ;(el as any)._magneticCleanup = () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },

    unmounted(el: HTMLElement) {
      ;(el as any)._magneticCleanup?.()
    },
  })
})
