<template>
  <div class="ce-brutal">
    <WebGLBrutalistLight />

    <main class="brutal-content-stack">
    <!-- Hero -->
    <section class="ce-hero-brutal">
      <div class="container">
        <div class="ce-hero-brutal__grid">
          <div class="ce-hero-brutal__content">
            <span class="ce-section-label">PROGRAMME_</span>
            <h1 class="ce-hero-brutal__title">
              TON ENTREPRISE, DE L'IDEE AU LANCEMENT
              <span class="ce-hero-brutal__title--accent">AVEC L'IA.</span>
            </h1>
            <p class="ce-hero-brutal__subtitle">
              On commence par le plus dur : trouver la bonne idée et s'assurer qu'elle te correspond. Ensuite, on construit tout le reste ensemble. De A à Z, avec l'IA comme accélérateur.
            </p>
            <div class="ce-hero-brutal__badges">
              <div class="ce-badge-brutal">
                <Users :size="16" />
                <span><strong>2 100+</strong> entrepreneurs lances</span>
              </div>
              <div class="ce-badge-brutal">
                <Star :size="16" />
                <span><strong>4.8/5</strong> satisfaction client</span>
              </div>
              <div class="ce-badge-brutal">
                <Award :size="16" />
                <span><strong>100%</strong> financable</span>
              </div>
            </div>
            <div class="ce-hero-brutal__ctas">
              <AppButton variant="primary" size="lg" to="/autonomie">
                JE ME FORME EN AUTONOMIE
                <ArrowRight :size="18" />
              </AppButton>
              <AppButton variant="ghost-light" size="lg" :href="externalLinks.booking.brevoMeeting">
                JE VEUX ÊTRE ACCOMPAGNÉ
                <ArrowRight :size="18" />
              </AppButton>
            </div>
          </div>
          <div class="ce-hero-brutal__image-col">
            <div class="ce-hero-brutal__image-wrap">
              <NuxtImg src="/img/kevin-creer.jpeg" alt="Creer mon entreprise" format="webp" quality="80" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="CONSTRUIS TA VISION." />

    <!-- Modules -->
    <section class="ce-modules-brutal">
      <div class="container">
        <div class="ce-modules-brutal__header text-center">
          <span class="ce-section-label">PROGRAMME_</span>
          <h2 class="ce-modules-brutal__title">UN PROGRAMME COMPLET, PENSE POUR PASSER A L'ACTION.</h2>
        </div>

        <div class="ce-modules-brutal__grid">
          <div
            v-for="(mod, i) in modules"
            :key="mod.title"
            class="ce-mod-card"
            :class="i % 2 === 0 ? 'ce-mod-card--purple' : 'ce-mod-card--orange'"
          >
            <div class="ce-mod-card__top">
              <span class="ce-mod-card__step">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="ce-mod-card__icon">
                <component :is="mod.icon" :size="28" />
              </div>
            </div>
            <h4 class="ce-mod-card__title">{{ mod.title }}</h4>
            <p class="ce-mod-card__desc">{{ mod.description }}</p>
          </div>
        </div>
        <div class="text-center mt-48">
          <AppButton variant="primary" size="lg" @click="scrollToFormulas">
            DÉCOUVRIR LES FORMULES
            <ArrowRight :size="18" />
          </AppButton>
        </div>
      </div>
    </section>

    <TunnelTransition text="PASSE À L'ACTION." />

    <!-- Two Formulas -->
    <section id="formulas" class="ce-formulas-brutal">
      <div class="container">
        <div class="ce-formulas-brutal__header text-center">
          <span class="ce-section-label">FORMULES_</span>
          <h2 class="ce-formulas-brutal__title">SELON TON RYTHME.</h2>
        </div>

        <div class="ce-formulas-brutal__grid">
          <!-- Card 1: Autonomie (Standard) -->
          <div class="ce-price-card ce-price-card--purple">
            <div class="ce-price-card__icon ce-price-card__icon--purple">
              <BookOpen :size="28" />
            </div>
            <span class="ce-price-card__badge ce-price-card__badge--purple">FORMATION EN AUTONOMIE</span>
            <p class="ce-price-card__sub">Accessible 24h/24, 7j/7</p>
            <p class="ce-price-card__desc">
              Tout le programme en ligne. Avance à ton rythme. Accès immédiat.
            </p>
            <div class="ce-price-card__checks">
              <div class="ce-price-card__check ce-price-card__check--purple">
                <CheckCircle :size="16" />
                <span>Acces immediat</span>
              </div>
              <div class="ce-price-card__check ce-price-card__check--purple">
                <CheckCircle :size="16" />
                <span>Formation complementaire offerte</span>
              </div>
              <div class="ce-price-card__check ce-price-card__check--purple">
                <CheckCircle :size="16" />
                <span>Contenu mis a jour</span>
              </div>
            </div>
            <AppButton variant="ghost-light" block to="/autonomie">
              DÉCOUVRIR LA FORMATION
              <ArrowRight :size="18" />
            </AppButton>
          </div>

          <!-- Card 2: Accompagnement (Featured) -->
          <div class="ce-price-card ce-price-card--orange">
            <div class="ce-price-card__ribbon">RECOMMANDE</div>
            <div class="ce-price-card__icon ce-price-card__icon--orange">
              <Handshake :size="28" />
            </div>
            <span class="ce-price-card__badge ce-price-card__badge--orange">ACCOMPAGNEMENT PERSONNALISE</span>
            <p class="ce-price-card__sub">Formation live + modules pratiques + suivi</p>
            <p class="ce-price-card__desc">
              Le full package : sessions live avec Kevin, modules pratiques, et un suivi personnalisé jusqu'au lancement.
            </p>
            <div class="ce-price-card__checks">
              <div class="ce-price-card__check ce-price-card__check--orange">
                <CheckCircle :size="16" />
                <span>Sessions live avec Kevin</span>
              </div>
              <div class="ce-price-card__check ce-price-card__check--orange">
                <CheckCircle :size="16" />
                <span>Modules pratiques complets</span>
              </div>
              <div class="ce-price-card__check ce-price-card__check--orange">
                <CheckCircle :size="16" />
                <span>Formation complementaire offerte</span>
              </div>
            </div>
            <div class="ce-price-card__financable">
              <Award :size="18" />
              <span>100% FINANÇABLE</span>
            </div>
            <AppButton variant="primary" block :href="externalLinks.booking.brevoMeeting">
              JE VEUX ETRE ACCOMPAGNE
              <ArrowRight :size="18" />
            </AppButton>
            <div class="ce-price-card__trust">
              <Shield :size="14" />
              <span>APPEL GRATUIT, SANS ENGAGEMENT</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="LANCE-TOI." />

    <!-- Reassurance Mosaic -->
    <ImageMosaic :images="mosaicImages">
      <span class="ce-section-label">POURQUOI_</span>
      <h2 class="ce-mosaic-title">CE QUI NOUS DISTINGUE.</h2>
      <p class="ce-mosaic-subtitle">
        On commence par toi, pas par un business plan théorique. L'IA est intégrée dès le premier jour, et derrière la formation, un vrai entrepreneur.
      </p>
      <AppButton variant="primary" :href="externalLinks.booking.brevoMeeting" class="mt-24">
        EN SAVOIR PLUS <ArrowRight :size="16" />
      </AppButton>
    </ImageMosaic>

    <!-- Final CTA -->
    <CTABrutalist
      titleLine1="PRÊT À TE"
      titleLine2="LANCER ?"
      subtitle="Un appel gratuit de 30 minutes pour faire le point sur ton projet."
      buttonText="JE RÉSERVE MON APPEL"
      :buttonHref="externalLinks.booking.brevoMeeting"
    />

    <!-- Exit Intent Popup -->
    <KitLancementModal
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Lightbulb, CheckCircle, Scale, BarChart3, Megaphone, Bot, Gift,
  ArrowRight, Award, Users, Star, Shield, Loader2, BookOpen, Handshake,
} from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'

useHead({
  title: 'Créer mon entreprise',
  meta: [
    {
      name: 'description',
      content: 'Créez votre entreprise de A à Z avec l\'IA comme accélérateur. Formation en autonomie ou accompagnement personnalisé. 100% finançable.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()
onMounted(() => {
  trackViewContent({ content_name: 'Créer mon entreprise' })
  trackViewItem({ content_name: 'Créer mon entreprise' })
  trackConversion()
})

const kitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6, storagePrefix: 'kit_creer' })

const modules = [
  { icon: Lightbulb, title: 'Trouver & valider ton idée', description: 'Identifie une idée solide avec un vrai potentiel business. Validée par la data, pas par l\'intuition.' },
  { icon: CheckCircle, title: 'Valider que le marché suit', description: 'Analyse ton marché, ta cible et la concurrence. Avant de foncer, on vérifie.' },
  { icon: Scale, title: 'Choisir la bonne structure', description: 'Micro, SASU, SARL, on t\'aide à choisir la forme adaptée. Rapidement, sans prise de tête.' },
  { icon: BarChart3, title: 'Business plan & financement', description: 'Un plan solide, chiffré, qui convainc. Financement et lancement au programme.' },
  { icon: Megaphone, title: 'Marketing & développement commercial', description: 'Trouve tes premiers clients et mets en place une stratégie d\'acquisition efficace.' },
  { icon: Bot, title: 'L\'IA comme copilote dès le départ', description: 'L\'IA intégrée dès le départ. Gagne du temps, automatise, et avance plus vite.' },
  { icon: Gift, title: 'Une formation offerte au choix', description: 'En bonus : une formation complémentaire offerte pour aller encore plus loin.' },
]

function scrollToFormulas() {
  document.querySelector('#formulas')?.scrollIntoView({ behavior: 'smooth' })
}

const mosaicImages = Array.from({ length: 28 }, (_, i) => `/img/mosaic/${String(i + 1).padStart(2, '0')}.jpg`)

// Payment for autonomie formula
const router = useRouter()
const isLoading = ref(false)

const { trackAddToCart } = useFBPixel()
const { trackAddToCart: gTrackAddToCart } = useGoogleAds()

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
  gsap.fromTo('.ce-hero-brutal__title',
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 }
  )
  gsap.fromTo('.ce-hero-brutal__subtitle',
    { x: -40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
  )
  gsap.fromTo('.ce-badge-brutal',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
  )
  gsap.fromTo('.ce-hero-brutal__image-wrap',
    { scale: 0.9, opacity: 0, rotationZ: 3 },
    { scale: 1, opacity: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.4 }
  )

  // Module cards entrance with ScrollTrigger
  gsap.fromTo('.ce-mod-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.ce-modules-brutal__grid', start: 'top 80%' },
    }
  )

  // Pricing cards entrance
  gsap.fromTo('.ce-price-card--purple',
    { x: -60, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.ce-formulas-brutal__grid', start: 'top 75%' },
    }
  )
  gsap.fromTo('.ce-price-card--orange',
    { x: 60, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: '.ce-formulas-brutal__grid', start: 'top 75%' },
    }
  )
})
</script>

<style lang="scss" scoped>
// ============================================
// BRUTALIST DESIGN - Creer Entreprise
// ============================================

.ce-brutal {
  position: relative;
  background: #FFF;
  color: #000;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

// --- Section Label ---
.ce-section-label {
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
.ce-hero-brutal {
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
  }

  &__ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 32px;
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
      max-height: 800px;
      object-fit: cover;
      object-position: center 50%;
    }
  }
}

.ce-badge-brutal {
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
}

// ============================================
// MODULES
// ============================================
.ce-modules-brutal {
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

.ce-mod-card {
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

    .ce-mod-card__step {
      color: $purple;
    }

    .ce-mod-card__icon {
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

    .ce-mod-card__step {
      color: $orange;
    }

    .ce-mod-card__icon {
      border-color: $orange;
      color: $orange;
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
// FORMULAS / PRICING
// ============================================
.ce-formulas-brutal {
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

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.ce-price-card {
  border: 4px solid #000;
  background: #FFF;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;

  &--purple {
    box-shadow: 8px 8px 0px $purple;
    border-left: 8px solid $purple;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px $purple;
    }
  }

  &--orange {
    box-shadow: 8px 8px 0px $orange;
    border-left: 8px solid $orange;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px $orange;
    }
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

  &__icon {
    width: 64px;
    height: 64px;
    border: 3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    background: #FFF;

    &--purple { color: $purple; }
    &--orange { color: $orange; }
  }

  &__badge {
    display: inline-block;
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 6px 14px;
    border: 2px solid #000;
    margin-bottom: 16px;
    align-self: flex-start;

    &--purple {
      color: $purple;
      box-shadow: 3px 3px 0px $purple;
    }

    &--orange {
      color: $orange;
      box-shadow: 3px 3px 0px $orange;
    }
  }

  &__sub {
    font-family: $font-mono;
    font-size: $small;
    font-weight: 600;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 16px;
  }

  &__desc {
    font-family: $font-mono;
    font-size: $small;
    color: $text-body;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  &__checks {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
    flex-grow: 1;
  }

  &__check {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-mono;
    font-size: $small;
    color: #000;

    svg { flex-shrink: 0; }
    &--purple svg { color: $purple; }
    &--orange svg { color: $orange; }
  }

  &__price {
    text-align: center;
    margin-bottom: 20px;
    padding: 16px 0;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
  }

  &__amount {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -0.03em;

    &--purple { color: $purple; }
    &--orange { color: $orange; }
  }

  &__financable {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    justify-content: center;
    padding: 16px 24px;
    margin-bottom: 20px;
    background: #000;
    color: $orange;
    font-family: $font-heading;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;

    svg {
      color: $orange;
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

  &__spin {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// ============================================
// MOSAIC TEXT OVERRIDES
// ============================================
.ce-mosaic-title {
  font-family: $font-heading;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #000;
  margin-bottom: 16px;
}

.ce-mosaic-subtitle {
  font-family: $font-mono;
  font-size: $body;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
}

.mt-48 { margin-top: 48px; }
.text-center { text-align: center; }

@media (max-width: 640px) {
  .ce-hero-brutal {
    padding: 120px 0 40px;
  }

  .ce-hero-brutal__image-wrap {
    box-shadow: 6px 6px 0px $purple;
  }

  .ce-mod-card {
    padding: 20px 16px;

    &--purple { box-shadow: 4px 4px 0px $purple; }
    &--orange { box-shadow: 4px 4px 0px $orange; }
  }

  .ce-price-card {
    padding: 24px 20px;

    &--purple { box-shadow: 4px 4px 0px $purple; }
    &--orange { box-shadow: 4px 4px 0px $orange; }
  }

  .ce-modules-brutal,
  .ce-formulas-brutal {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .ce-hero-brutal__badges {
    flex-direction: column;
  }

  .ce-hero-brutal__ctas {
    flex-direction: column;
  }
}
</style>
