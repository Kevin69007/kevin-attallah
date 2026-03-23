<template>
  <div class="page-eia-brutal">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
    <!-- Hero -->
    <section class="eia-hero-brutal">
      <div class="container eia-hero-brutal__grid">
        <div class="eia-hero-brutal__content">
          <span class="section-label">INTELLIGENCE_ARTIFICIELLE_</span>
          <h1 class="eia-hero-brutal__title">
            <span class="block">L'IA TRAVAILLE.</span>
            <span class="block outline-text">TOI TU</span>
            <span class="block text-purple">ENCAISSES.</span>
          </h1>
          <p class="eia-hero-brutal__subtitle">
            On identifie ensemble ce que l'IA peut faire concrètement pour ton business. Pas de promesses vagues, des solutions adaptées à ta réalité.
          </p>
          <div class="eia-hero-brutal__ctas">
            <AppButton variant="primary" size="lg" :href="externalLinks.booking.propulseAvecIA">
              JE VEUX UN AUDIT GRATUIT
              <ArrowRight :size="20" />
            </AppButton>
          </div>
        </div>

        <div class="eia-hero-brutal__image-col">
          <div class="eia-hero-brutal__image-wrap">
            <NuxtImg src="/img/kevin-evoluer.jpeg" alt="Faire évoluer avec l'IA" format="webp" quality="80" class="eia-hero-brutal__img" />
          </div>
        </div>
      </div>
    </section>

    <TunnelTransition text="LE PROBLÈME EST LÀ." />

    <!-- Pain Points -->
    <section class="eia-pain-brutal">
      <div class="container">
        <div class="eia-pain-brutal__header">
          <span class="section-label">PROBLÈMES_</span>
          <h2 class="eia-pain-brutal__title">PENDANT QUE TU GÈRES, TES CONCURRENTS AUTOMATISENT.</h2>
        </div>

        <div class="eia-pain-brutal__list">
          <div v-for="pain in painPoints" :key="pain.text" class="eia-pain-brutal__item">
            <component :is="pain.icon" :size="24" class="eia-pain-brutal__icon" />
            <span class="eia-pain-brutal__text">{{ pain.text }}</span>
          </div>
        </div>

        <div class="eia-pain-brutal__closing">
          <p class="eia-pain-brutal__closing-text">
            L'IA peut régler tout ça. La question, c'est pas si tu vas t'y mettre,
          </p>
          <span class="eia-pain-brutal__closing-punch">c'est quand ?</span>
        </div>
        <div class="text-center mt-48">
          <AppButton variant="primary" size="lg" :href="externalLinks.booking.propulseAvecIA">
            JE VEUX MON AUDIT IA
            <ArrowRight :size="20" />
          </AppButton>
        </div>
      </div>
    </section>

    <TunnelTransition text="LA MÉTHODE." />

    <!-- Parcours -->
    <section class="eia-parcours-brutal">
      <div class="container">
        <div class="eia-parcours-brutal__header text-center">
          <span class="section-label">PROCESSUS_</span>
          <h2 class="eia-parcours-brutal__title">ON AVANCE ENSEMBLE, ÉTAPE PAR ÉTAPE.</h2>
        </div>

        <div class="eia-parcours-brutal__grid">
          <article
            v-for="(step, index) in parcours"
            :key="step.title"
            :class="['eia-step-card', `eia-step-card--${stepColors[index]}`]"
          >
            <div class="eia-step-card__number">{{ String(index + 1).padStart(2, '0') }}</div>

            <div v-if="stepVideos[index]" class="eia-step-card__video-wrap">
              <video autoplay loop muted playsinline class="eia-step-card__video">
                <source :src="stepVideos[index]" type="video/mp4" />
              </video>
            </div>

            <div class="eia-step-card__icon">
              <component :is="step.icon" :size="28" />
            </div>
            <h3 class="eia-step-card__title">{{ step.title }}</h3>
            <p class="eia-step-card__desc">{{ step.description }}</p>
            <ul class="eia-step-card__sub">
              <li v-for="sub in step.subOptions" :key="sub">
                <CheckCircle :size="14" />
                <span>{{ sub }}</span>
              </li>
            </ul>
          </article>
        </div>
        <div class="text-center mt-48">
          <AppButton variant="primary" size="lg" :href="externalLinks.booking.propulseAvecIA">
            JE RÉSERVE MON APPEL
            <ArrowRight :size="20" />
          </AppButton>
        </div>
      </div>
    </section>

    <TunnelTransition text="DES SOLUTIONS CONCRÈTES." />

    <!-- Solutions -->
    <section class="eia-solutions-brutal">
      <div class="container">
        <div class="eia-solutions-brutal__header text-center">
          <span class="section-label">SOLUTIONS_</span>
          <h2 class="eia-solutions-brutal__title">DES SOLUTIONS CONCRÈTES, PRÊTES À BRANCHER.</h2>
        </div>

        <div class="eia-solutions-brutal__grid">
          <div
            v-for="(solution, i) in solutions"
            :key="solution.title"
            class="eia-sol-card"
            :class="i % 2 === 0 ? 'eia-sol-card--purple' : 'eia-sol-card--orange'"
          >
            <div class="eia-sol-card__top">
              <span class="eia-sol-card__step">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="eia-sol-card__icon">
                <component :is="solution.icon" :size="28" />
              </div>
            </div>
            <h4 class="eia-sol-card__title">{{ solution.title }}</h4>
            <p class="eia-sol-card__desc">{{ solution.description }}</p>
          </div>
        </div>

        <div class="eia-solutions-brutal__footer text-center">
          <AppButton variant="primary" size="lg" :href="externalLinks.booking.propulseAvecIA" class="mt-24">
            JE VEUX VOIR CE QU'ON PEUT FAIRE
            <ArrowRight :size="20" />
          </AppButton>
        </div>
      </div>
    </section>

    <TunnelTransition text="CE QUI CHANGE TOUT." />

    <!-- Reassurance Mosaic -->
    <ImageMosaic :images="mosaicImages">
      <span class="section-label">DIFFÉRENCE_</span>
      <h2 class="eia-mosaic-brutal__title">CE QUI NOUS DISTINGUE.</h2>
      <p class="eia-mosaic-brutal__subtitle">
        Zéro solution générique. L'audit est gratuit et il a de la vraie valeur. Des résultats rapides, mesurables, portés par un vrai entrepreneur.
      </p>
      <AppButton variant="primary" :href="externalLinks.booking.propulseAvecIA" class="mt-24">
        EN SAVOIR PLUS <ArrowRight :size="16" />
      </AppButton>
    </ImageMosaic>

    <!-- Final CTA -->
    <CTABrutalist titleLine1="PRÊT À VOIR" titleLine2="CE QUE L'IA PEUT FAIRE ?" subtitle="Un appel gratuit de 30 minutes. On qualifie tes besoins et on te dit honnêtement ce qu'on peut faire pour toi." buttonText="JE RÉSERVE MON APPEL" :buttonHref="externalLinks.booking.propulseAvecIA" />
    <KitLancementModal
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight, Phone, Banknote, Megaphone, UserSearch, Calculator,
  MessageCircle, Smartphone,
  AlertCircle, PhoneOff, Repeat, FolderSearch, CheckCircle,
  Search, Rocket,
} from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'
import CTABrutalist from '~/components/sections/brutalist/CTABrutalist.vue'
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import TunnelTransition from '~/components/sections/brutalist/TunnelTransition.vue'
import KitLancementModal from '~/components/ui/KitLancementModal.vue'

const kitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6, storagePrefix: 'kit_evoluer' })

useHead({
  title: 'Faire évoluer mon entreprise avec l\'IA',
  meta: [
    {
      name: 'description',
      content: 'Faites évoluer votre entreprise avec l\'IA. Audit gratuit, solutions personnalisées, déploiement. Finançable.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
const { trackConversion } = useLinkedIn()

onMounted(() => {
  trackViewContent({ content_name: 'Faire évoluer avec IA' })
  trackViewItem({ content_name: 'Faire évoluer avec IA' })
  trackConversion()
})

const painPoints = [
  { icon: AlertCircle, text: 'Des relances oubliées, des opportunités qui passent à côté.' },
  { icon: PhoneOff, text: 'Le téléphone sonne dans le vide quand tu es en rendez-vous.' },
  { icon: Repeat, text: 'Des heures perdues chaque semaine sur des tâches répétitives.' },
  { icon: FolderSearch, text: 'Des infos éparpillées entre 10 outils. Aucune vue d\'ensemble.' },
]

const parcours = [
  {
    icon: Phone,
    title: 'Un appel pour qualifier tes besoins',
    description: '30 minutes, gratuit et sans engagement.',
    subOptions: [
      'Comprendre ton business et tes blocages',
      'Identifier tes objectifs concrets',
      'Détecter tes premières opportunités IA',
    ],
  },
  {
    icon: Search,
    title: 'Un audit IA gratuit et personnalisé',
    description: 'Un diagnostic complet de ton activité.',
    subOptions: [
      'Identifier les tâches automatisables',
      'Évaluer les gains potentiels',
      'Solutions adaptées à ton activité',
    ],
  },
  {
    icon: Rocket,
    title: 'On déploie selon tes ressources',
    description: 'Tu choisis la formule qui te convient :',
    subOptions: [
      'Former tes équipes à utiliser l\'IA',
      'On déploie les solutions pour toi',
    ],
  },
]

const stepColors = ['purple', 'orange', 'white']
const stepVideos = ['/video/audit-strategie.mp4', '/video/integration-ia.mp4', '/video/evoluer-ia.mp4']

const solutions = [
  { icon: Phone, title: 'Agent réceptionniste', description: 'Répond aux appels 24/7, qualifie les demandes, transfère les urgences.' },
  { icon: Banknote, title: 'Agent relances & impayés', description: 'Relance automatiquement les factures en retard par email et SMS.' },
  { icon: Megaphone, title: 'Agent publicité', description: 'Crée, optimise et pilote tes campagnes pub automatiquement.' },
  { icon: UserSearch, title: 'Agent prospection', description: 'Identifie et contacte des prospects qualifiés pour toi.' },
  { icon: Calculator, title: 'Agent compta', description: 'Catégorise tes dépenses, prépare tes déclarations, alerte sur les anomalies.' },
  { icon: MessageCircle, title: 'Agent chat client', description: 'Répond aux questions fréquentes de tes clients instantanément.' },
  { icon: Smartphone, title: 'Pilotage depuis ton téléphone', description: 'Supervise tout depuis une app : KPIs, alertes, décisions rapides.' },
]

const mosaicImages = Array.from({ length: 28 }, (_, i) => `/img/mosaic/${String(i + 1).padStart(2, '0')}.jpg`)
</script>

<style lang="scss" scoped>
.page-eia-brutal {
  position: relative;
  background: #FFF;
  color: #000;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

// ─── HERO ────────────────────────────────────────────
.eia-hero-brutal {
  padding: 160px 0 100px;
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
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.04em;
    margin: 16px 0 32px;
    color: #000;
    text-transform: uppercase;

    .block { display: block; }

    .outline-text {
      color: transparent;
      -webkit-text-stroke: 3px #000;

      @media (max-width: 768px) {
        -webkit-text-stroke: 2px #000;
      }
    }

    .text-purple {
      color: $purple;
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: clamp(0.875rem, 1.2vw, 1rem);
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    max-width: 550px;
    margin-bottom: 40px;
    background: #FFF;
    padding: 16px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    display: inline-block;
    line-height: 1.6;
  }

  &__ctas {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__image-col {
    @media (max-width: 1024px) {
      max-width: 500px;
      margin: 0 auto;
    }
  }

  &__image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    background: #FAFAFA;
    border: 4px solid #000;
    box-shadow: 16px 16px 0px $purple;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 20px 20px 0px $orange;

      .eia-hero-brutal__img {
        transform: scale(1.03);
      }
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 50%;
    transition: transform 0.3s;
  }
}

// ─── PAIN POINTS ─────────────────────────────────────
.eia-pain-brutal {
  padding: 100px 0;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__header {
    margin-bottom: 48px;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #000;
    margin-top: 16px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 28px;
    border: 4px solid #000;
    border-bottom: none;
    background: #FFF;
    transition: transform 0.2s, box-shadow 0.2s;

    &:last-child {
      border-bottom: 4px solid #000;
    }

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 8px 8px 0px $orange;
      z-index: 2;
      position: relative;
    }
  }

  &__icon {
    color: $orange;
    flex-shrink: 0;
  }

  &__text {
    font-family: $font-mono;
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    color: #000;
  }

  &__closing {
    margin-top: 60px;
    padding: 40px 36px;
    border: 4px solid #000;
    background: #000;
    box-shadow: 12px 12px 0px $purple;
    max-width: 700px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translate(-4px, -4px);
      box-shadow: 16px 16px 0px $orange;
    }
  }

  &__closing-text {
    font-family: $font-mono;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 12px;
  }

  &__closing-punch {
    display: inline-block;
    font-family: $font-heading;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    text-transform: uppercase;
    color: $orange;
    line-height: 1;
    letter-spacing: -0.03em;
  }
}

// ─── PARCOURS ────────────────────────────────────────
.eia-parcours-brutal {
  padding: 100px 0;
  background: $bg-light-2;
  border-bottom: 4px solid #000;

  &__header {
    margin-bottom: 60px;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #000;
    margin-top: 16px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
}

.eia-step-card {
  border: 4px solid #000;
  border-right: none;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #FFF;
  transition: transform 0.2s, box-shadow 0.2s;

  &:last-child {
    border-right: 4px solid #000;
  }

  @media (max-width: 992px) {
    border-right: 4px solid #000;
    border-bottom: none;

    &:last-child {
      border-bottom: 4px solid #000;
    }
  }

  &:hover {
    transform: translateY(-8px);
    z-index: 10;
    border-right: 4px solid #000;
  }

  &--purple {
    &:hover { box-shadow: 12px 12px 0px $purple; }
  }

  &--orange {
    &:hover { box-shadow: 12px 12px 0px $orange; }
  }

  &--white {
    &:hover { box-shadow: 12px 12px 0px #000; }
  }

  &__number {
    font-family: $font-mono;
    font-size: clamp(4rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 0.8;
    color: rgba(0, 0, 0, 0.06);
    position: absolute;
    top: 16px;
    right: 16px;
    pointer-events: none;
  }

  &__video-wrap {
    width: 100%;
    aspect-ratio: 16/9;
    border: 4px solid #000;
    overflow: hidden;
    margin-bottom: 24px;
    background: #000;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(130%);
    transition: filter 0.3s;
    opacity: 0.8;
  }

  &:hover &__video {
    filter: grayscale(0%) contrast(110%);
    opacity: 1;
  }

  &__icon {
    width: 56px;
    height: 56px;
    border: 4px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
    margin-bottom: 20px;
    background: #FFF;
  }

  &__title {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    text-transform: uppercase;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #000;
    margin-bottom: 12px;
    font-weight: 700;
  }

  &__desc {
    font-family: $font-mono;
    font-size: 0.875rem;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  &__sub {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: $font-mono;
      font-size: 0.8125rem;
      font-weight: 700;
      color: #000;

      svg {
        color: $orange;
        flex-shrink: 0;
      }
    }
  }
}

// ─── SOLUTIONS ───────────────────────────────────────
.eia-solutions-brutal {
  padding: 100px 0;
  background: #FFF;
  border-bottom: 4px solid #000;

  &__header {
    margin-bottom: 60px;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #000;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
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

  &__footer {
    margin-top: 48px;
  }

  &__note {
    font-family: $font-mono;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 24px;
  }
}

.eia-sol-card {
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

    .eia-sol-card__step {
      color: $purple;
    }

    .eia-sol-card__icon {
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

    .eia-sol-card__step {
      color: $orange;
    }

    .eia-sol-card__icon {
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

// ─── MOSAIC ──────────────────────────────────────────
.eia-mosaic-brutal {
  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #000;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    max-width: 480px;
    line-height: 1.7;
  }
}

// ─── UTILITIES ───────────────────────────────────────
.mt-24 { margin-top: 24px; }
.mt-48 { margin-top: 48px; }

@media (max-width: 640px) {
  .eia-hero-brutal {
    padding: 120px 0 60px;
  }

  .eia-hero-brutal__image-wrap {
    box-shadow: 8px 8px 0px $purple;
  }

  .eia-pain-brutal__item {
    padding: 16px 20px;
  }

  .eia-pain-brutal__closing {
    padding: 24px 20px;
    box-shadow: 6px 6px 0px $purple;
  }

  .eia-hero-brutal__subtitle {
    box-shadow: 2px 2px 0px #000;
  }

  .eia-sol-card {
    padding: 20px 16px;

    &--purple { box-shadow: 4px 4px 0px $purple; }
    &--orange { box-shadow: 4px 4px 0px $orange; }
  }

  .eia-pain-brutal,
  .eia-parcours-brutal,
  .eia-solutions-brutal {
    padding: 60px 0;
  }
}
</style>
