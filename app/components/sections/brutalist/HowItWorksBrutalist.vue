<template>
  <section class="hiw-brutal" ref="sectionRef">
    <div class="hiw-brutal__header">
      <h2 class="hiw-brutal__title">SYSTÈME EN 3 ÉTAPES.</h2>
    </div>

    <!-- The horizontal track -->
    <div class="hiw-brutal__track-wrap" ref="trackWrapRef">
      <div class="hiw-brutal__track" ref="trackRef">

        <article
          v-for="(step, index) in steps"
          :key="step.number"
          :class="['brutal-step', `brutal-step--${step.color}`]"
          @mouseenter="onStepEnter(index)"
          @mouseleave="onStepLeave(index)"
        >
          <div class="brutal-step__number">{{ step.number }}</div>

          <!-- Video preview on hover -->
          <div v-if="step.video" class="brutal-step__video-wrap" ref="videoWrapRefs">
            <video
              ref="videoRefs"
              :src="step.video"
              muted
              loop
              playsinline
              preload="metadata"
              class="brutal-step__video"
            />
          </div>

          <h3 class="brutal-step__title" v-html="step.title"></h3>
          <p class="brutal-step__desc">{{ step.desc }}</p>
        </article>

        <!-- Ending block -->
        <article class="brutal-step brutal-step--black">
          <h3 class="brutal-step__title text-white">PRÊT ?</h3>
          <AppButton variant="primary" class="mt-4" :href="externalLinks.booking.brevoMeeting">
            LANCER LE PROTOCOLE
          </AppButton>
        </article>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { externalLinks } from '~/data/external-links'

const sectionRef = ref<HTMLElement | null>(null)
const trackWrapRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const videoRefs = ref<HTMLVideoElement[]>([])
const videoWrapRefs = ref<HTMLElement[]>([])

const { $gsap } = useNuxtApp()
let ctx: any

const steps = [
  {
    number: '01',
    title: 'AUDIT &<br>STRATÉGIE',
    desc: "On détruit ce qui ne marche pas. On garde l'essentiel. Mise en place d'un plan d'action implacable.",
    color: 'purple',
    video: '/video/audit-strategie.mp4'
  },
  {
    number: '02',
    title: 'INTÉGRATION<br>IA',
    desc: 'Déploiement des workflows automatisés. Vos processus deviennent des machines de guerre infatigables.',
    color: 'orange',
    video: '/video/integration-ia.mp4'
  },
  {
    number: '03',
    title: 'AUTOMATISATION<br>BUSINESS',
    desc: 'Acquisition agressive. Optimisation des conversions. On prend la place qui vous revient sur le marché.',
    color: 'white',
    video: '/video/scale-domination.mp4'
  }
]

function onStepEnter(index: number) {
  const video = videoRefs.value?.[index]
  const wrap = videoWrapRefs.value?.[index]
  if (!video || !wrap) return

  video.currentTime = 0
  video.play().catch(() => {})
  wrap.classList.add('is-visible')
}

function onStepLeave(index: number) {
  const video = videoRefs.value?.[index]
  const wrap = videoWrapRefs.value?.[index]
  if (!video || !wrap) return

  wrap.classList.remove('is-visible')
  video.pause()
}

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  ctx = gsap.context(() => {
    const trackWidth = trackRef.value?.scrollWidth || window.innerWidth * 3
    const amountToScroll = trackWidth - window.innerWidth

    gsap.to(trackRef.value, {
      x: -amountToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: trackWrapRef.value,
        start: 'top top',
        end: `+=${amountToScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})
</script>

<style lang="scss" scoped>
.hiw-brutal {
  background: $bg-light-2;
  position: relative;
  z-index: 20;
  border-bottom: 4px solid #000;
  overflow: hidden;

  &__header {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 30;
    mix-blend-mode: difference;
    color: #FFF;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  &__track-wrap {
    height: 100vh;
    display: flex;
    align-items: center;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0iI2QxZDVkYiI+PC9jaXJjbGU+Cjwvc3ZnPg==') repeat;
  }

  &__track {
    display: flex;
    height: 70vh;
    padding: 0 10vw;
    gap: 0;
  }
}

.brutal-step {
  flex: 0 0 600px;
  height: 100%;
  border: 4px solid #000;
  border-right: none;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  transition: transform 0.3s;

  &:last-child {
    border-right: 4px solid #000;
    flex: 0 0 400px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex: 0 0 85vw;
    padding: 30px 20px;
  }

  &--purple {
    background: $purple;
    color: #FFF;

    .brutal-step__title { color: #FFF; }
    .brutal-step__desc { color: rgba(255, 255, 255, 0.85); }
    .brutal-step__number { color: rgba(255, 255, 255, 0.2); }
  }

  &--orange {
    background: $orange;
    color: #FFF;

    .brutal-step__title { color: #FFF; }
    .brutal-step__desc { color: rgba(255, 255, 255, 0.85); }
    .brutal-step__number { color: rgba(255, 255, 255, 0.2); }
  }

  &--white {
    background: #FFF;
    color: #000;

    .brutal-step__number { color: rgba(0, 0, 0, 0.08); }
  }

  &--black {
    background: #000;
    color: #FFF;
  }

  &__number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: $font-mono;
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 700;
    line-height: 0.8;
    opacity: 1;
    pointer-events: none;
  }

  &__video-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 42%;
    transform: translateY(-50%) scale(0.92);
    height: 280px;
    border-top: 4px solid #000;
    border-bottom: 4px solid #000;
    overflow: hidden;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.4s ease, transform 0.4s ease;
    pointer-events: none;

    &.is-visible {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }

  &__desc {
    font-family: $font-mono;
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 400px;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    border-right: 4px solid #000;
    box-shadow: 16px 16px 0px rgba(0,0,0,0.5);
    z-index: 10;
  }
}

@media (max-width: 640px) {
  .hiw-brutal__header {
    top: 20px;
    left: 20px;
  }

  .hiw-brutal__track-wrap {
    padding: 0 5vw;
  }

  .brutal-step {
    flex: 0 0 90vw;
    padding: 30px 20px;
  }

  .brutal-step__number {
    font-size: clamp(3rem, 10vw, 6rem);
  }

  .brutal-step__title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
}
</style>
