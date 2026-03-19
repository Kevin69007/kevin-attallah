<template>
  <section ref="sectionEl" class="how-it-works">
    <div class="how-it-works__inner">
      <!-- Header -->
      <div class="how-it-works__header">
        <div class="container">
          <ScrollReveal :once="true">
            <span class="section-label text-center">Comment ça se passe</span>
            <h2 class="section-title text-center">
              Comment ça se <span class="gradient-text">passe</span> ?
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <!-- Cards area -->
      <div class="how-it-works__cards-area">
        <div class="container">
          <div ref="wrapperEl" class="how-it-works__accordion">
            <div
              v-for="(step, i) in steps"
              :key="i"
              :ref="(el) => { if (el) cardEls[i] = el as HTMLElement }"
              class="how-it-works__card glass-card-light"
              :style="{ zIndex: steps.length - i }"
            >
              <div class="how-it-works__card-header">
                <span class="how-it-works__card-number gradient-text">{{ String(i + 1).padStart(2, '0') }}</span>
                <div class="how-it-works__card-icon">
                  <component :is="step.icon" :size="22" />
                </div>
                <h3 class="how-it-works__card-title">{{ step.title }}</h3>
              </div>
              <div
                :ref="(el) => { if (el) bodyEls[i] = el as HTMLElement }"
                class="how-it-works__card-body"
              >
                <p class="how-it-works__card-desc">{{ step.description }}</p>
                <div class="how-it-works__card-video">
                  <video autoplay loop muted playsinline>
                    <source :src="step.video" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="how-it-works__footer">
        <div class="container">
          <div class="text-center">
            <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
              Je prends mon appel gratuit
              <ArrowRight :size="20" />
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Phone, Route, Rocket, ArrowRight } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

const steps = [
  { icon: Phone, title: 'Cadrage stratégique offert', description: '30 minutes d\'appel cash pour auditer votre situation. Pas de blabla, juste de la valeur. Si je peux vous aider, je vous le dis. Sinon, je vous oriente.', video: '/video/audit-strategie.mp4' },
  { icon: Route, title: 'Roadmap sur-mesure & Financement', description: 'Nous élaborons un plan de bataille chirurgical (création ou scale). Et cerise sur le gâteau : l\'accompagnement est intégralement finançable par vos droits.', video: '/video/integration-ia.mp4' },
  { icon: Rocket, title: 'Exécution implacable', description: 'Fini le doute. Vous agissez avec des systèmes qui ont fait leurs preuves et mon expertise pour débloquer chaque obstacle en temps réel.', video: '/video/scale-domination.mp4' },
]

const sectionEl = ref<HTMLElement>()
const wrapperEl = ref<HTMLElement>()
const cardEls: HTMLElement[] = []
const bodyEls: HTMLElement[] = []

onMounted(() => {
  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
  if (!gsap || !ScrollTrigger || !sectionEl.value || !wrapperEl.value) return

  // Initial: all bodies collapsed
  bodyEls.forEach((body) => {
    gsap.set(body, { height: 0, opacity: 0, overflow: 'hidden' })
  })

  // Pin the entire section and animate cards within
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top top',
      end: '+=200%',
      scrub: 0.8,
      pin: true,
      pinSpacing: true,
    },
  })

  bodyEls.forEach((body, i) => {
    const pos = i * 1.5

    // Collapse previous card
    if (i > 0) {
      tl.to(bodyEls[i - 1], {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, pos)

      tl.to(cardEls[i - 1], {
        opacity: 0.7,
        boxShadow: 'none',
        duration: 0.3,
      }, pos)
    }

    // Raise current card z-index
    tl.set(cardEls[i], { zIndex: 10 + i }, pos)

    // Expand current card body
    tl.to(body, {
      height: 'auto',
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, pos + 0.2)

    // Highlight current card
    tl.to(cardEls[i], {
      boxShadow: '0 0 0 2px rgba(108, 43, 217, 0.4), 0 16px 48px rgba(108, 43, 217, 0.15)',
      opacity: 1,
      duration: 0.3,
    }, pos + 0.2)
  })
})
</script>

<style lang="scss" scoped>
.how-it-works {
  position: relative;
  z-index: 2;

  // Inner layout: fills exactly one viewport, flexbox column
  &__inner {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
  }

  // Header: heading with breathing room below navbar
  &__header {
    flex-shrink: 0;
    padding-top: clamp(100px, 14vh, 160px);
    padding-bottom: 32px;
  }

  // Cards area: takes remaining space, clips overflow
  &__cards-area {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  // Footer: CTA pinned at bottom
  &__footer {
    flex-shrink: 0;
    padding: 24px 0 clamp(32px, 5vh, 60px);
  }

  &__accordion {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 0 auto;
  }

  &__card {
    position: relative;
    border-radius: $radius-md;
    overflow: hidden;
    transition: box-shadow 0.4s ease;
    will-change: transform, opacity;
    // Wallet overlap
    margin-top: -20px;

    &:first-child {
      margin-top: 0;
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 28px;
  }

  &__card-number {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
    opacity: 0.4;
  }

  &__card-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
    flex-shrink: 0;
  }

  &__card-title {
    font-size: $body-lg;
    font-weight: 700;
    color: $text-heading;
  }

  &__card-body {
    padding: 0 28px 24px;
  }

  &__card-desc {
    font-size: $small;
    color: $text-body;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  &__card-video {
    border-radius: 16px;
    overflow: hidden;

    video {
      width: 100%;
      display: block;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }
  }
}
</style>
