<template>
  <div ref="wrapperEl" class="reveal-path">
    <div class="reveal-path__stage">
      <!-- SVG path -->
      <svg
        ref="svgEl"
        class="reveal-path__svg"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="'#6C2BD9'" />
            <stop offset="100%" :stop-color="'#C67651'" />
          </linearGradient>
        </defs>
        <path
          ref="pathEl"
          d="M 50,200 C 200,50 350,350 500,200 S 800,50 950,200 S 1100,350 1150,200"
          stroke="url(#pathGradient)"
          stroke-width="2"
          stroke-linecap="round"
          fill="none"
        />
      </svg>

      <!-- Node dots -->
      <div
        v-for="(_, i) in 4"
        :key="`dot-${i}`"
        :ref="(el) => setDotRef(el, i)"
        class="reveal-path__dot"
      ></div>

      <!-- Cards at each node -->
      <div
        v-for="(value, i) in values"
        :key="value.title"
        :ref="(el) => setCardRef(el, i)"
        v-magnetic="0.15"
        class="reveal-path__card glass-card-light"
      >
        <div class="reveal-path__card-content">
          <div class="reveal-path__card-icon">
            <component :is="value.icon" :size="22" />
          </div>
          <h4 class="reveal-path__card-title">{{ value.title }}</h4>
          <p class="reveal-path__card-desc">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Value {
  icon: Component
  title: string
  description: string
}

defineProps<{ values: Value[] }>()

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
const wrapperEl = ref<HTMLElement>()
const svgEl = ref<SVGSVGElement>()
const pathEl = ref<SVGPathElement>()
const cardEls: HTMLElement[] = []
const dotEls: HTMLElement[] = []

function setCardRef(el: any, i: number) {
  if (el) cardEls[i] = el as HTMLElement
}
function setDotRef(el: any, i: number) {
  if (el) dotEls[i] = el as HTMLElement
}

// Card positions along the path (at 15%, 40%, 65%, 90%)
const NODE_POSITIONS = [0.15, 0.40, 0.65, 0.90]
// Alternate cards above/below path
const CARD_OFFSETS_Y = [-170, 80, -170, 80]

onMounted(() => {
  if (!gsap || !ScrollTrigger || !wrapperEl.value || !pathEl.value || !svgEl.value) return

  const isMobile = window.innerWidth <= 768
  const path = pathEl.value

  if (isMobile) {
    // Mobile: hide SVG, show cards in simple stagger
    if (svgEl.value) svgEl.value.style.display = 'none'
    dotEls.forEach((d) => { if (d) d.style.display = 'none' })
    cardEls.forEach((card) => {
      if (card) {
        card.style.position = 'relative'
        card.style.transform = 'none'
        card.style.left = 'auto'
        card.style.top = 'auto'
        gsap.set(card, { opacity: 0, y: 30 })
      }
    })
    gsap.to(cardEls, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapperEl.value,
        start: 'top 80%',
      },
    })
    return
  }

  // Get path length for dash animation
  const pathLength = path.getTotalLength()
  path.style.strokeDasharray = String(pathLength)
  path.style.strokeDashoffset = String(pathLength)

  // Position cards and dots along the path
  const svgRect = svgEl.value.getBoundingClientRect()
  const stageRect = wrapperEl.value.querySelector('.reveal-path__stage')!.getBoundingClientRect()

  NODE_POSITIONS.forEach((t, i) => {
    const point = path.getPointAtLength(t * pathLength)
    // Convert SVG coordinates to stage coordinates
    const scaleX = svgRect.width / 1200
    const scaleY = svgRect.height / 400
    const px = point.x * scaleX + (svgRect.left - stageRect.left)
    const py = point.y * scaleY + (svgRect.top - stageRect.top)

    // Position dot
    const dot = dotEls[i]
    if (dot) {
      dot.style.left = `${px}px`
      dot.style.top = `${py}px`
      gsap.set(dot, { scale: 0, opacity: 0 })
    }

    // Position card (offset above/below path)
    const card = cardEls[i]
    if (card) {
      card.style.left = `${px - 120}px` // center card (240px wide)
      card.style.top = `${py + CARD_OFFSETS_Y[i]!}px`
      gsap.set(card, { scale: 0, opacity: 0 })
    }
  })

  // Scroll-driven timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperEl.value,
      start: 'top 15%',
      end: 'bottom 15%',
      scrub: 1,
      pin: true,
    },
  })

  // Draw path
  tl.to(path, {
    strokeDashoffset: 0,
    duration: 4,
    ease: 'none',
  }, 0)

  // Reveal dots and cards at their respective progress points
  NODE_POSITIONS.forEach((t, i) => {
    const timeOffset = t * 4 // align with path draw progress

    // Dot appears
    const dot = dotEls[i]
    if (dot) {
      tl.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(2)',
      }, timeOffset)
    }

    // Card scales in
    const card = cardEls[i]
    if (card) {
      tl.to(card, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      }, timeOffset)
    }
  })
})

onUnmounted(() => {
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((st: any) => {
      if (st.trigger === wrapperEl.value) st.kill()
    })
  }
})
</script>

<style lang="scss" scoped>
.reveal-path {
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &__stage {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 500px;
    margin: 0 auto;
    padding: 0 24px;

    @media (max-width: 768px) {
      height: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 0 16px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  &__dot {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -7px;
    margin-top: -7px;
    border-radius: 50%;
    background: $purple;
    box-shadow: 0 0 20px rgba($purple, 0.4);
    z-index: 5;
    animation: dot-pulse 2s ease-in-out infinite;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__card {
    position: absolute;
    width: 240px;
    border-radius: $radius-lg;
    overflow: hidden;
    cursor: pointer;
    will-change: transform, opacity;
    z-index: 10;

    &:hover {
      transform: none;
    }

    @media (max-width: 768px) {
      position: relative;
      width: 100%;
      left: auto !important;
      top: auto !important;
    }
  }

  &__card-content {
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }

  &__card-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
  }

  &__card-title {
    font-size: $body;
    font-weight: 700;
    color: $text-heading;
  }

  &__card-desc {
    font-size: $xs;
    color: $text-muted;
    line-height: 1.5;
  }
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba($purple, 0.3); }
  50% { box-shadow: 0 0 25px rgba($purple, 0.6); }
}
</style>
