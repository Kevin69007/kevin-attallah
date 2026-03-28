<template>
  <div ref="wrapperEl" class="reveal-path">
    <div class="reveal-path__stage">
      <!-- Horizontal line -->
      <svg
        ref="svgEl"
        class="reveal-path__line"
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6C2BD9" />
            <stop offset="100%" stop-color="#C67651" />
          </linearGradient>
        </defs>
        <line
          ref="lineEl"
          x1="0" y1="2" x2="1000" y2="2"
          stroke="url(#lineGrad)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <!-- Nodes -->
      <div class="reveal-path__nodes">
        <div
          v-for="(value, i) in values"
          :key="value.title"
          :ref="(el) => setNodeRef(el, i)"
          class="reveal-path__node"
        >
          <!-- Background title -->
          <span
            :ref="(el) => setBgRef(el, i)"
            class="reveal-path__bg-title"
          >{{ value.title }}</span>

          <!-- Dot -->
          <div
            :ref="(el) => setDotRef(el, i)"
            class="reveal-path__dot"
          ></div>

          <!-- Connector line from dot to card -->
          <div
            :ref="(el) => setConnRef(el, i)"
            class="reveal-path__connector"
          ></div>

          <!-- Card -->
          <div
            :ref="(el) => setCardRef(el, i)"
            v-magnetic="0.12"
            class="reveal-path__card glass-card-light"
          >
            <div class="reveal-path__card-inner">
              <div class="reveal-path__card-icon">
                <component :is="value.icon" :size="22" />
              </div>
              <h4 class="reveal-path__card-title">{{ value.title }}</h4>
              <p class="reveal-path__card-desc">{{ value.description }}</p>
            </div>
          </div>
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
const lineEl = ref<SVGLineElement>()
const nodeEls: HTMLElement[] = []
const dotEls: HTMLElement[] = []
const connEls: HTMLElement[] = []
const cardEls: HTMLElement[] = []
const bgEls: HTMLElement[] = []

function setNodeRef(el: any, i: number) { if (el) nodeEls[i] = el as HTMLElement }
function setDotRef(el: any, i: number) { if (el) dotEls[i] = el as HTMLElement }
function setConnRef(el: any, i: number) { if (el) connEls[i] = el as HTMLElement }
function setCardRef(el: any, i: number) { if (el) cardEls[i] = el as HTMLElement }
function setBgRef(el: any, i: number) { if (el) bgEls[i] = el as HTMLElement }

onMounted(() => {
  if (!gsap || !ScrollTrigger || !wrapperEl.value || !lineEl.value) return

  const isMobile = window.innerWidth <= 768
  const line = lineEl.value

  if (isMobile) {
    if (svgEl.value) svgEl.value.style.display = 'none'
    dotEls.forEach((d) => { if (d) d.style.display = 'none' })
    connEls.forEach((c) => { if (c) c.style.display = 'none' })
    bgEls.forEach((b) => { if (b) b.style.display = 'none' })
    cardEls.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, y: 30 })
    })
    gsap.to(cardEls, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapperEl.value,
        start: 'top 85%',
      },
    })
    return
  }

  // Line draw setup
  const lineLength = 1000
  line.setAttribute('stroke-dasharray', String(lineLength))
  line.setAttribute('stroke-dashoffset', String(lineLength))

  // Initial states
  dotEls.forEach((dot) => { if (dot) gsap.set(dot, { scale: 0, opacity: 0 }) })
  connEls.forEach((conn) => { if (conn) gsap.set(conn, { scaleY: 0, opacity: 0 }) })
  cardEls.forEach((card) => { if (card) gsap.set(card, { opacity: 0, y: 24 }) })
  bgEls.forEach((bg) => { if (bg) gsap.set(bg, { opacity: 0, scale: 0.9 }) })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperEl.value,
      start: 'top 80%',
      end: 'top 25%',
      scrub: 0.6,
    },
  })

  // Draw the full line
  tl.to(line, {
    attr: { 'stroke-dashoffset': 0 },
    duration: 1,
    ease: 'none',
  }, 0)

  // Reveal each node
  const count = 4
  for (let i = 0; i < count; i++) {
    const offset = 0.15 + i * 0.4

    // Fade out PREVIOUS bg title before this card starts
    if (i > 0) {
      const prevBg = bgEls[i - 1]
      if (prevBg) {
        tl.to(prevBg, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        }, offset - 0.08)
      }
    }

    // Dot appears
    const dot = dotEls[i]
    if (dot) {
      tl.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.18,
        ease: 'back.out(2)',
      }, offset)
    }

    // Connector grows down
    const conn = connEls[i]
    if (conn) {
      tl.to(conn, {
        scaleY: 1,
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
      }, offset + 0.05)
    }

    // Background title fades in
    const bg = bgEls[i]
    if (bg) {
      tl.to(bg, {
        opacity: 0.08,
        scale: 1,
        duration: 0.22,
        ease: 'power2.out',
      }, offset + 0.06)
    }

    // Card slides up
    const card = cardEls[i]
    if (card) {
      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power3.out',
      }, offset + 0.08)
    }
  }

  // Fade out the last bg title at the end
  const lastBg = bgEls[count - 1]
  if (lastBg) {
    tl.to(lastBg, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    }, 0.15 + (count - 1) * 0.4 + 0.35)
  }
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
  padding: 48px 0 32px;

  &__stage {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__line {
    width: 100%;
    height: 4px;
    display: block;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__nodes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: -2px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 0;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__node {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__bg-title {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: $font-heading;
    font-size: clamp(3.5rem, 6vw, 6rem);
    font-weight: 900;
    white-space: nowrap;
    opacity: 0;
    color: $purple;
    pointer-events: none;
    z-index: 0;
    user-select: none;
    line-height: 1;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $purple;
    box-shadow: 0 0 16px rgba($purple, 0.35);
    flex-shrink: 0;
    z-index: 5;
    animation: dot-pulse 2.5s ease-in-out infinite;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__connector {
    width: 1px;
    height: 32px;
    background: linear-gradient(to bottom, $purple, rgba($purple, 0.15));
    transform-origin: top;
    flex-shrink: 0;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__card {
    position: relative;
    z-index: 2;
    border-radius: $radius-lg;
    overflow: hidden;
    cursor: pointer;
    will-change: transform, opacity;
    width: 100%;

    &:hover {
      transform: none;
    }
  }

  &__card-inner {
    padding: 28px 20px;
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
    font-size: $small;
    color: $text-muted;
    line-height: 1.5;
  }
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba($purple, 0.25); }
  50% { box-shadow: 0 0 20px rgba($purple, 0.5); }
}
</style>
