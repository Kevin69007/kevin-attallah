const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], select, label[for], [data-cursor="pointer"], .btn, .magnetic-btn, .header__link, .header__cta'
const DISTORT_SELECTOR = 'h1, h2, h3, h4, p, .glass-card-light, .glass-card, img, .btn, .social__link, [class*="__stat"], .badge, .section-title, .section-subtitle, .section-label, span.gradient-text, .footer__watermark, .about-hero__text'

const DISTORT_RADIUS = 100
const DISTORT_STRENGTH = 8
const SKEW_STRENGTH = 1.2
const ROTATION_STRENGTH = 0.6

interface DistortTarget {
  el: HTMLElement
  qx: (v: number) => void
  qy: (v: number) => void
  qsx: (v: number) => void
  qsy: (v: number) => void
  qr: (v: number) => void
  active: boolean
}

export function useCursorTracker() {
  const cursorEl = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const isHovering = ref(false)
  const isTouch = ref(false)

  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0

  const LERP = 0.08
  const LERP_HOVER = 0.05

  let gsap: any = null
  let distortTargets: DistortTarget[] = []

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

  function cacheDistortTargets() {
    // Reset previous targets
    distortTargets.forEach((t) => {
      gsap.set(t.el, { x: 0, y: 0, skewX: 0, skewY: 0, rotation: 0 })
    })

    const quickToOpts = { duration: 0.8, ease: 'power3.out' }

    distortTargets = Array.from(document.querySelectorAll<HTMLElement>(DISTORT_SELECTOR))
      .filter(el => !el.closest('.glass-cursor') && !el.closest('.magnetic-btn'))
      .map((el) => ({
        el,
        qx: gsap.quickTo(el, 'x', quickToOpts),
        qy: gsap.quickTo(el, 'y', quickToOpts),
        qsx: gsap.quickTo(el, 'skewX', quickToOpts),
        qsy: gsap.quickTo(el, 'skewY', quickToOpts),
        qr: gsap.quickTo(el, 'rotation', quickToOpts),
        active: false,
      }))
  }

  function onTick() {
    if (!cursorEl.value || !isVisible.value) return

    // Lerp cursor position
    const speed = isHovering.value ? LERP_HOVER : LERP
    currentX += (mouseX - currentX) * speed
    currentY += (mouseY - currentY) * speed
    gsap.set(cursorEl.value, { x: currentX, y: currentY })

    // Proximity distortion — shape deformation on content elements
    const viewH = window.innerHeight
    for (let i = 0; i < distortTargets.length; i++) {
      const target = distortTargets[i]
      const rect = target.el.getBoundingClientRect()

      // Skip off-screen elements
      if (rect.bottom < -DISTORT_RADIUS || rect.top > viewH + DISTORT_RADIUS) {
        if (target.active) {
          target.qx(0)
          target.qy(0)
          target.qsx(0)
          target.qsy(0)
          target.qr(0)
          target.active = false
        }
        continue
      }

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = currentX - cx
      const dy = currentY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < DISTORT_RADIUS && dist > 0) {
        const force = 1 - dist / DISTORT_RADIUS
        const nx = dx / dist
        const ny = dy / dist

        // Translate — pull toward cursor
        target.qx(nx * force * DISTORT_STRENGTH)
        target.qy(ny * force * DISTORT_STRENGTH)

        // Skew — shape bends toward cursor
        target.qsx(nx * force * SKEW_STRENGTH)
        target.qsy(ny * force * SKEW_STRENGTH * 0.5)

        // Rotation — slight twist
        target.qr(nx * force * ROTATION_STRENGTH)

        target.active = true
      } else if (target.active) {
        // Spring back to original shape
        target.qx(0)
        target.qy(0)
        target.qsx(0)
        target.qsy(0)
        target.qr(0)
        target.active = false
      }
    }
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

    // Initialize position to center (avoid flash in corner)
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    currentX = mouseX
    currentY = mouseY

    // Cache distortable elements after DOM settles
    nextTick(() => {
      cacheDistortTargets()
    })

    // Recache on route change (new page = new elements)
    const router = useRouter()
    router.afterEach(() => {
      nextTick(() => {
        cacheDistortTargets()
      })
    })

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

    // Reset all distorted elements
    distortTargets.forEach((t) => {
      gsap.set(t.el, { x: 0, y: 0, skewX: 0, skewY: 0, rotation: 0, clearProps: 'x,y,skewX,skewY,rotation' })
    })
    distortTargets = []

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
