const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], select, label[for], [data-cursor="pointer"], .btn, .magnetic-btn, .header__link, .header__cta'

export function useCursorTracker() {
  const cursorEl = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const isHovering = ref(false)
  const isTouch = ref(false)

  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0

  const LERP = 0.15
  const LERP_HOVER = 0.1

  let gsap: any = null

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!isVisible.value) isVisible.value = true
  }

  function onMouseLeave() {
    isVisible.value = false
  }

  function onMouseEnter() {
    isVisible.value = true
  }

  function onMouseOver(e: MouseEvent) {
    const target = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)
    if (target && !isHovering.value) {
      isHovering.value = true
      if (cursorEl.value && gsap) {
        gsap.to(cursorEl.value, {
          scale: 1.5,
          duration: 0.4,
          ease: 'power3.out',
        })
      }
    }
  }

  function onMouseOut(e: MouseEvent) {
    const related = (e.relatedTarget as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)
    if (!related && isHovering.value) {
      isHovering.value = false
      if (cursorEl.value && gsap) {
        gsap.to(cursorEl.value, {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        })
      }
    }
  }

  function onTick() {
    if (!cursorEl.value || !isVisible.value) return
    const speed = isHovering.value ? LERP_HOVER : LERP
    currentX += (mouseX - currentX) * speed
    currentY += (mouseY - currentY) * speed
    gsap.set(cursorEl.value, { x: currentX, y: currentY })
  }

  onMounted(() => {
    // Touch detection — bail out entirely
    if (
      'ontouchstart' in window
      || navigator.maxTouchPoints > 0
      || window.matchMedia('(hover: none)').matches
    ) {
      isTouch.value = true
      return
    }

    const nuxtApp = useNuxtApp()
    gsap = nuxtApp.$gsap as any

    // Hide native cursor
    document.body.classList.add('has-custom-cursor')

    // Initialize position to center (avoid flash in corner)
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    currentX = mouseX
    currentY = mouseY

    // Event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    // Hook into existing GSAP ticker (same RAF as Lenis)
    gsap.ticker.add(onTick)
  })

  onUnmounted(() => {
    if (isTouch.value) return

    document.body.classList.remove('has-custom-cursor')
    document.removeEventListener('mousemove', onMouseMove)
    document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    document.documentElement.removeEventListener('mouseenter', onMouseEnter)
    document.removeEventListener('mouseover', onMouseOver)
    document.removeEventListener('mouseout', onMouseOut)

    if (gsap) {
      gsap.ticker.remove(onTick)
    }
  })

  return { cursorEl, isVisible, isHovering, isTouch }
}
