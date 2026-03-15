<template>
  <div class="auto-brutal">
    <WebGLBrutalistLight />

    <main class="brutal-content-stack">
    <!-- Hero -->
    <section class="auto-hero-brutal">
      <div class="container">
        <div class="auto-hero-brutal__grid">
          <div class="auto-hero-brutal__content">
            <span class="auto-section-label">FORMATION_AUTONOMIE_</span>
            <h1 class="auto-hero-brutal__title">
              CRÉER MON ENTREPRISE
              <span class="auto-hero-brutal__title--accent">EN AUTONOMIE.</span>
            </h1>
            <p class="auto-hero-brutal__subtitle">
              Tout le programme pour lancer ton activité de A à Z, à ton rythme. L'IA intégrée dès le départ, accès immédiat.
            </p>
            <div class="auto-hero-brutal__badges">
              <div class="auto-badge-brutal">
                <Users :size="16" />
                <span><strong>2 100+</strong> entrepreneurs lancés</span>
              </div>
              <div class="auto-badge-brutal">
                <Star :size="16" />
                <span><strong>4.8/5</strong> satisfaction</span>
              </div>
              <div class="auto-badge-brutal auto-badge-brutal--orange">
                <Award :size="16" />
                <span><strong>100%</strong> FINANÇABLE</span>
              </div>
            </div>
            <AppButton variant="primary" :disabled="isLoading" class="mt-24" @click="handlePurchase">
              <Loader2 v-if="isLoading" :size="18" class="auto-spin" />
              {{ isLoading ? 'CHARGEMENT...' : 'JE ME LANCE' }}
              <ArrowRight v-if="!isLoading" :size="18" />
            </AppButton>
          </div>
          <div class="auto-hero-brutal__image-col">
            <div class="auto-hero-brutal__image-wrap">
              <NuxtImg src="/img/about/about-2.png" alt="Formation en autonomie" format="webp" quality="80" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="TON PARCOURS." />

    <!-- What You Get -->
    <section class="auto-avantages-brutal">
      <div class="container">
        <div class="auto-avantages-brutal__header text-center">
          <span class="auto-section-label">AVANTAGES_</span>
          <h2 class="auto-avantages-brutal__title">CE QUE TU OBTIENS.</h2>
        </div>

        <div class="auto-avantages-brutal__grid">
          <div
            v-for="(item, i) in avantages"
            :key="item.title"
            class="auto-av-card"
            :class="item.bonus ? 'auto-av-card--bonus' : (i % 2 === 0 ? 'auto-av-card--purple' : 'auto-av-card--orange')"
          >
            <div class="auto-av-card__top">
              <span class="auto-av-card__step">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="auto-av-card__icon">
                <component :is="item.icon" :size="28" />
              </div>
            </div>
            <h4 class="auto-av-card__title">{{ item.title }}</h4>
            <p class="auto-av-card__desc">{{ item.description }}</p>
          </div>
        </div>

        <div class="text-center mt-48">
          <AppButton variant="primary" size="lg" @click="scrollToTarif">
            VOIR LE TARIF
            <ArrowRight :size="18" />
          </AppButton>
        </div>
      </div>
    </section>

    <TunnelTransition text="PASSE À L'ACTION." />

    <!-- Pricing -->
    <section id="tarif" class="auto-pricing-brutal">
      <div class="container">
        <div class="auto-pricing-brutal__header text-center">
          <span class="auto-section-label">TARIF_</span>
          <h2 class="auto-pricing-brutal__title">UN INVESTISSEMENT, PAS UNE DÉPENSE.</h2>
        </div>

        <div class="auto-pricing-brutal__center">
          <div class="auto-pricing-card">
            <div class="auto-pricing-card__ribbon">100% FINANÇABLE</div>
            <div class="auto-pricing-card__price">
              <span class="auto-pricing-card__amount">299EUR</span>
            </div>
            <div class="auto-pricing-card__checks">
              <div class="auto-pricing-card__check">
                <CheckCircle :size="16" />
                <span>Accès immédiat</span>
              </div>
              <div class="auto-pricing-card__check">
                <CheckCircle :size="16" />
                <span>Formation complète de A à Z</span>
              </div>
              <div class="auto-pricing-card__check">
                <CheckCircle :size="16" />
                <span>IA intégrée dès le départ</span>
              </div>
              <div class="auto-pricing-card__check">
                <CheckCircle :size="16" />
                <span>Formation bonus offerte au choix</span>
              </div>
              <div class="auto-pricing-card__check">
                <CheckCircle :size="16" />
                <span>Contenu mis à jour</span>
              </div>
            </div>
            <AppButton variant="primary" block :disabled="isLoading" @click="handlePurchase">
              <Loader2 v-if="isLoading" :size="18" class="auto-spin" />
              {{ isLoading ? 'CHARGEMENT...' : 'JE ME LANCE' }}
              <ArrowRight v-if="!isLoading" :size="18" />
            </AppButton>
            <div class="auto-pricing-card__trust">
              <Shield :size="14" />
              <span>PAIEMENT SÉCURISÉ</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mosaic -->
    <ImageMosaic :images="mosaicImages">
      <span class="auto-section-label">CONFIANCE_</span>
      <h2 class="auto-mosaic-title">ILS SE SONT LANCÉS.</h2>
      <p class="auto-mosaic-subtitle">
        Plus de 2 100 entrepreneurs ont suivi ce parcours. À ton tour.
      </p>
    </ImageMosaic>

    <!-- Final CTA -->
    <CTABrutalist
      titleLine1="TU PRÉFÈRES ÊTRE"
      titleLine2="ACCOMPAGNÉ ?"
      subtitle="Un appel gratuit de 30 minutes pour faire le point sur ton projet."
      buttonText="JE RÉSERVE MON APPEL"
      :buttonHref="externalLinks.booking.brevoMeeting"
    />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Clock, Bot, Gauge, RefreshCw, Gift,
  CheckCircle, ArrowRight, Award, Users, Star, Shield, Loader2,
} from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'
import CTABrutalist from '~/components/sections/brutalist/CTABrutalist.vue'
import ImageMosaic from '~/components/sections/shared/ImageMosaic.vue'

useHead({
  title: 'Créer mon entreprise - Formation en autonomie',
  meta: [
    {
      name: 'description',
      content: 'Créez votre entreprise de A à Z en autonomie. Accès immédiat, IA intégrée, formation bonus offerte. 299€, 100% finançable.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
onMounted(() => {
  trackViewContent({ content_name: 'Créer mon entreprise - Autonomie' })
  trackViewItem({ content_name: 'Créer mon entreprise - Autonomie' })
  trackConversion()
})

const avantages = [
  { icon: Clock, title: 'Accès immédiat', description: 'Commence quand tu veux. Avance à ton rythme, sans contrainte de planning.' },
  { icon: Bot, title: 'L\'IA comme copilote', description: 'L\'intelligence artificielle intégrée dès le premier module. Tu gagnes du temps avant même de finir.' },
  { icon: Gauge, title: 'Avance à ton rythme', description: 'Accessible 24h/24, 7j/7. Pas de sessions live imposées. Tu gères ton planning.' },
  { icon: RefreshCw, title: 'Contenu mis à jour', description: 'Les modules évoluent avec le marché. Tu as toujours accès à la dernière version.' },
  { icon: Gift, title: 'UNE FORMATION OFFERTE', description: 'En bonus : choisis une formation complémentaire parmi +100 formations professionnelles.', bonus: true },
]

const mosaicImages = Array.from({ length: 20 }, (_, i) => `/img/mosaic/${String(i + 1).padStart(2, '0')}.jpg`)

// Payment
const router = useRouter()
const isLoading = ref(false)

const { trackAddToCart } = useFBPixel()
const { trackAddToCart: gTrackAddToCart } = useGoogleAds()

function scrollToTarif() {
  document.querySelector('#tarif')?.scrollIntoView({ behavior: 'smooth' })
}

async function handlePurchase() {
  if (isLoading.value) return

  trackAddToCart({
    content_name: 'Créer mon entreprise - Autonomie',
    content_category: 'Formations',
    content_ids: ['creation-entreprise-autonomie'],
    value: 299,
    currency: 'EUR',
  })
  gTrackAddToCart({
    items: [{ item_name: 'Créer mon entreprise - Autonomie', item_id: 'creation-entreprise-autonomie', price: 299 }],
    value: 299,
    currency: 'EUR',
  })

  isLoading.value = true

  try {
    const data = await $fetch('/api/create-order', {
      method: 'POST',
      body: {
        productId: 'creation-entreprise-autonomie',
        currency: 'EUR',
        description: 'Créer mon entreprise - Formation en autonomie',
      },
    })

    localStorage.setItem('orderResponse', JSON.stringify(data))
    router.push('/paiement')
  } catch {
    const { useToast } = await import('vue-toastification')
    useToast().error('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isLoading.value = false
  }
}

// GSAP entrance animations
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (!$gsap) return
  const gsap = $gsap as any

  // Hero entrance
  gsap.fromTo('.auto-hero-brutal__title',
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 }
  )
  gsap.fromTo('.auto-hero-brutal__subtitle',
    { x: -40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
  )
  gsap.fromTo('.auto-badge-brutal',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
  )
  gsap.fromTo('.auto-hero-brutal__image-wrap',
    { scale: 0.9, opacity: 0, rotationZ: 3 },
    { scale: 1, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.4 }
  )

  // Avantages cards entrance with ScrollTrigger
  gsap.fromTo('.auto-av-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.auto-avantages-brutal__grid', start: 'top 80%' },
    }
  )

  // Pricing card entrance
  gsap.fromTo('.auto-pricing-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.auto-pricing-brutal__center', start: 'top 75%' },
    }
  )
})
</script>

<style lang="scss" scoped>
// ============================================
// BRUTALIST DESIGN - Autonomie
// ============================================

.auto-brutal {
  position: relative;
  background: #FFF;
  color: #000;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

// --- Section Label ---
.auto-section-label {
  display: inline-block;
  font-family: $font-mono;
  font-size: $xs;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $purple;
  border: 2px solid #000;
  padding: 6px 16px;
  margin-bottom: 20px;
  background: #FFF;
  box-shadow: 4px 4px 0px #000;
}

// ============================================
// HERO
// ============================================
.auto-hero-brutal {
  padding: 140px 0 80px;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    width: 100%;
  }

  &__title {
    font-family: $font-heading;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #000;
    margin-bottom: 24px;

    &--accent {
      display: block;
      color: $purple;
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $body;
    font-weight: 500;
    color: #000;
    line-height: 1.7;
    max-width: 550px;
    margin-bottom: 32px;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 8px;
  }

  &__image-col {
    @media (max-width: 1024px) {
      max-width: 500px;
      margin: 0 auto;
    }
  }

  &__image-wrap {
    border: 4px solid #000;
    box-shadow: 12px 12px 0px $purple;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 16px 16px 0px $orange;
    }

    img {
      width: 100%;
      display: block;
    }
  }
}

.auto-badge-brutal {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: $font-mono;
  font-size: $xs;
  font-weight: 700;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 2px solid #000;
  background: #FFF;
  color: #000;
  box-shadow: 4px 4px 0px $purple;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px $orange;
  }

  strong {
    color: $purple;
  }

  &--orange {
    box-shadow: 4px 4px 0px $orange;

    strong {
      color: $orange;
    }

    &:hover {
      box-shadow: 6px 6px 0px $orange;
    }
  }
}

// ============================================
// AVANTAGES
// ============================================
.auto-avantages-brutal {
  padding: 100px 0;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__header {
    margin-bottom: 48px;
  }

  &__title {
    font-family: $font-heading;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #000;
    max-width: 800px;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
}

.auto-av-card {
  border: 4px solid #000;
  background: #FFF;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &--purple {
    box-shadow: 8px 8px 0px $purple;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px $purple;
    }

    .auto-av-card__step {
      color: $purple;
    }

    .auto-av-card__icon {
      border-color: $purple;
      color: $purple;
    }
  }

  &--orange {
    box-shadow: 8px 8px 0px $orange;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px $orange;
    }

    .auto-av-card__step {
      color: $orange;
    }

    .auto-av-card__icon {
      border-color: $orange;
      color: $orange;
    }
  }

  &--bonus {
    background: $orange;
    color: #FFF;
    box-shadow: 8px 8px 0px #000;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px #000;
    }

    .auto-av-card__step {
      color: #FFF;
    }

    .auto-av-card__icon {
      border-color: #FFF;
      color: #FFF;
      background: transparent;
    }

    .auto-av-card__title {
      color: #FFF;
    }

    .auto-av-card__desc {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &__top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__step {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border: 3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFF;
  }

  &__title {
    font-family: $font-heading;
    font-size: $body;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 8px;
  }

  &__desc {
    font-family: $font-mono;
    font-size: $small;
    color: $text-body;
    line-height: 1.6;
  }
}

// ============================================
// PRICING
// ============================================
.auto-pricing-brutal {
  padding: 100px 0;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__header {
    margin-bottom: 48px;
  }

  &__title {
    font-family: $font-heading;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #000;
  }

  &__center {
    display: flex;
    justify-content: center;
  }
}

.auto-pricing-card {
  border: 4px solid #000;
  background: #FFF;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  width: 100%;
  box-shadow: 8px 8px 0px $purple;
  border-left: 8px solid $purple;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px $purple;
  }

  &__ribbon {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 24px;
    background: $orange;
    color: #FFF;
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    white-space: nowrap;
    z-index: 2;
  }

  &__price {
    text-align: center;
    margin-bottom: 24px;
    padding: 16px 0;
    border-bottom: 2px solid #000;
  }

  &__amount {
    font-family: $font-heading;
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: $purple;
  }

  &__checks {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
  }

  &__check {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-mono;
    font-size: $small;
    color: #000;

    svg {
      flex-shrink: 0;
      color: $purple;
    }
  }

  &__trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    color: $text-muted;
    text-transform: uppercase;
  }
}

.auto-spin {
  animation: auto-spin 1s linear infinite;
}

@keyframes auto-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// ============================================
// MOSAIC TEXT OVERRIDES
// ============================================
.auto-mosaic-title {
  font-family: $font-heading;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #000;
  margin-bottom: 16px;
}

.auto-mosaic-subtitle {
  font-family: $font-mono;
  font-size: $body;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
}

.text-center { text-align: center; }
.mt-48 { margin-top: 48px; }

@media (max-width: 640px) {
  .auto-hero-brutal {
    padding: 120px 0 40px;
  }

  .auto-hero-brutal__image-wrap {
    box-shadow: 6px 6px 0px $purple;
  }

  .auto-av-card {
    padding: 20px 16px;

    &--purple { box-shadow: 4px 4px 0px $purple; }
    &--orange { box-shadow: 4px 4px 0px $orange; }
  }

  .auto-pricing-card {
    padding: 24px 20px;
  }

  .auto-pricing-card__amount {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }

  .auto-avantages-brutal,
  .auto-pricing-brutal {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .auto-hero-brutal__badges {
    flex-direction: column;
  }
}
</style>
