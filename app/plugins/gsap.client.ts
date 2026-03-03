import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.defaults({
    ease: 'power3.out',
    duration: 1,
  })

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  // Sync Lenis scroll events to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker as the single RAF loop (no double RAF)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Refresh ScrollTrigger after page navigation
  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => {
      ScrollTrigger.refresh()
    })
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      lenis,
    },
  }
})
