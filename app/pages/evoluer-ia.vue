<template>
  <div>
    <!-- Hero -->
    <section class="eia-hero section--light">
      <div class="eia-hero__bg">
        <div class="orb orb--purple eia-hero__orb eia-hero__orb--1"></div>
        <div class="orb orb--orange eia-hero__orb eia-hero__orb--2"></div>
      </div>
      <div class="container">
        <div class="split eia-hero__split">
          <ScrollReveal direction="left">
            <h1 class="eia-hero__title">
              Ton entreprise tourne déjà. L'IA peut la faire tourner
              <span class="gradient-text">mieux — et plus vite.</span>
            </h1>
            <p class="eia-hero__subtitle">
              On identifie ensemble ce que l'IA peut faire concrètement pour ton business. Pas des
              promesses génériques — des solutions adaptées à ta réalité.
            </p>
            <div class="btn-group mt-32">
              <MagneticButton>
                <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
                  Je veux un audit gratuit
                  <ArrowRight :size="20" />
                </AppButton>
              </MagneticButton>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div class="eia-hero__image glass-card-light">
              <NuxtImg src="/img/banner-right-img.jpg" alt="Faire évoluer avec l'IA" format="webp" quality="80" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Pain Point -->
    <section class="eia-pain section--white">
      <div class="container">
        <ScrollReveal>
          <h2 class="section-title text-center">
            Pendant que tu gères, tes concurrents <span class="gradient-text">automatisent.</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-2 mt-48" :stagger="0.15">
          <div v-for="pain in painPoints" :key="pain.text" class="eia-pain__item glass-card-light">
            <component :is="pain.icon" :size="22" class="eia-pain__icon" />
            <span>{{ pain.text }}</span>
          </div>
        </StaggerGrid>

        <ScrollReveal :delay="0.4">
          <p class="eia-pain__closing text-center mt-48">
            L'IA peut régler tout ça. La question c'est pas si tu vas t'y mettre —
            <strong>c'est quand.</strong>
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Parcours -->
    <section class="eia-parcours section--light">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Comment ça se passe</span>
          <h2 class="section-title text-center">
            On avance ensemble, <span class="gradient-text">étape par étape.</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-3 mt-48" :stagger="0.2">
          <div v-for="(step, index) in parcours" :key="index" class="eia-step glass-card-light">
            <div class="eia-step__number gradient-text">0{{ index + 1 }}</div>
            <div class="eia-step__icon">
              <component :is="step.icon" :size="28" />
            </div>
            <h3 class="eia-step__title">{{ step.title }}</h3>
            <p class="eia-step__desc">{{ step.description }}</p>
            <div v-if="step.subOptions" class="eia-step__sub">
              <div v-for="sub in step.subOptions" :key="sub" class="eia-step__sub-item">
                <CheckCircle :size="14" />
                <span>{{ sub }}</span>
              </div>
            </div>
          </div>
        </StaggerGrid>
      </div>
    </section>

    <!-- Solutions -->
    <section class="eia-solutions section--white">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Des solutions concrètes</span>
          <h2 class="section-title text-center">
            Des solutions concrètes, <span class="gradient-text">prêtes à brancher</span>
          </h2>
          <p class="section-subtitle text-center" style="margin: 8px auto 0; max-width: 500px">
            Voici quelques exemples de ce qu'on a déjà mis en place...
          </p>
        </ScrollReveal>

        <StaggerGrid class="grid grid-bento-7 mt-48" :stagger="0.1">
          <GlassCard v-for="(solution, i) in solutions" :key="solution.title" variant="light">
            <div class="eia-solution" :class="i >= 5 ? 'eia-solution--compact' : 'text-center'">
              <span class="eia-solution__step">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="eia-solution__icon">
                <component :is="solution.icon" :size="i >= 5 ? 22 : 28" />
              </div>
              <div>
                <h4 class="eia-solution__title">{{ solution.title }}</h4>
                <p class="eia-solution__desc">{{ solution.description }}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerGrid>

        <ScrollReveal :delay="0.3">
          <p class="eia-solutions__note text-center mt-32">
            Et bien d'autres selon ton activité...
          </p>
          <div class="text-center mt-24">
            <MagneticButton>
              <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
                Je veux voir ce qu'on peut faire pour mon business
                <ArrowRight :size="20" />
              </AppButton>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Reassurance -->
    <section class="eia-reassurance section--light">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Pourquoi c'est différent</span>
          <h2 class="section-title text-center">
            Ce qui nous <span class="gradient-text">distingue.</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-4 mt-48" :stagger="0.15">
          <GlassCard v-for="item in reassurance" :key="item.title" variant="light">
            <div class="eia-reassure text-center">
              <div class="eia-reassure__icon">
                <component :is="item.icon" :size="28" />
              </div>
              <h4 class="eia-reassure__title">{{ item.title }}</h4>
              <p class="eia-reassure__desc">{{ item.description }}</p>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- Final CTA -->
    <CTASection
      title="Prêt à voir ce que l'IA peut faire pour ton business ?"
      subtitle="Un appel gratuit de 30 minutes. On qualifie tes besoins et on te dit honnêtement ce qu'on peut faire pour toi."
      primaryText="Je réserve mon appel gratuit"
      :primaryHref="externalLinks.booking.brevoMeeting"
      secondaryText=""
    />
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight, Phone, Banknote, Megaphone, UserSearch, Calculator,
  MessageCircle, Smartphone, Target, Lightbulb, Zap, User,
  AlertCircle, PhoneOff, Repeat, FolderSearch, CheckCircle,
  ClipboardList, Search, Rocket, Award, Users, Star,
} from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

useHead({
  title: 'Faire évoluer mon entreprise avec l\'IA',
  meta: [
    {
      name: 'description',
      content: 'Faites évoluer votre entreprise avec l\'IA. Audit gratuit, solutions personnalisées, déploiement — finançable.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Faire évoluer avec IA' })
  trackViewItem({ content_name: 'Faire évoluer avec IA' })
})

const painPoints = [
  { icon: AlertCircle, text: 'Des relances clients oubliées, des opportunités perdues' },
  { icon: PhoneOff, text: 'Le téléphone sonne dans le vide quand tu es en rendez-vous' },
  { icon: Repeat, text: 'Des tâches répétitives qui te bouffent des heures chaque semaine' },
  { icon: FolderSearch, text: 'Des infos éparpillées entre 10 outils différents' },
]

const parcours = [
  {
    icon: Phone,
    title: 'Un appel pour qualifier tes besoins',
    description: '30 minutes pour comprendre ton business, tes blocages et tes objectifs. Gratuit, sans engagement.',
  },
  {
    icon: Search,
    title: 'Un audit IA gratuit et personnalisé',
    description: 'On identifie les tâches automatisables, les gains potentiels et les solutions adaptées à ton activité.',
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

const solutions = [
  { icon: Phone, title: 'Agent réceptionniste', description: 'Répond aux appels 24/7, qualifie les demandes, transfère les urgences.' },
  { icon: Banknote, title: 'Agent relances & impayés', description: 'Relance automatiquement les factures en retard par email et SMS.' },
  { icon: Megaphone, title: 'Agent publicité', description: 'Crée, optimise et pilote tes campagnes pub automatiquement.' },
  { icon: UserSearch, title: 'Agent prospection', description: 'Identifie et contacte des prospects qualifiés pour toi.' },
  { icon: Calculator, title: 'Agent compta', description: 'Catégorise tes dépenses, prépare tes déclarations, alerte sur les anomalies.' },
  { icon: MessageCircle, title: 'Agent chat client', description: 'Répond aux questions fréquentes de tes clients instantanément.' },
  { icon: Smartphone, title: 'Pilotage depuis ton téléphone', description: 'Supervise tout depuis une app — KPIs, alertes, décisions rapides.' },
]

const reassurance = [
  { icon: Target, title: 'Zéro solution générique', description: 'Chaque recommandation est adaptée à ton activité, pas copiée d\'un template.' },
  { icon: Lightbulb, title: 'L\'audit est gratuit — et il a de la valeur', description: 'Même si on ne travaille pas ensemble, tu repars avec des pistes concrètes.' },
  { icon: Zap, title: 'Des résultats rapides et mesurables', description: 'On mesure l\'impact en heures gagnées, en euros économisés, en leads générés.' },
  { icon: User, title: 'Derrière tout ça, un vrai entrepreneur', description: 'Kevin utilise ces outils dans ses propres entreprises. C\'est du concret.' },
]
</script>

<style lang="scss" scoped>
.eia-hero {
  padding: 140px 0 80px;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__orb {
    position: absolute;
    &--1 { width: 400px; height: 400px; top: -10%; right: -5%; opacity: 0.2; }
    &--2 { width: 250px; height: 250px; bottom: 10%; left: -5%; opacity: 0.15; }
  }

  &__split {
    align-items: center;
  }

  &__title {
    font-size: $h1;
    color: $text-heading;
    line-height: 1.15;
    margin-bottom: 24px;
  }

  &__subtitle {
    font-size: $body-lg;
    color: $text-muted;
    line-height: 1.7;
    max-width: 550px;
  }

  &__image {
    padding: 0;
    overflow: hidden;
    border-radius: $radius-lg;

    img {
      width: 100%;
      display: block;
    }
  }
}

.eia-pain {
  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    font-size: $small;
    color: $text-body;
  }

  &__icon {
    color: $orange;
    flex-shrink: 0;
  }

  &__closing {
    font-size: $body-lg;
    color: $text-body;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;

    strong {
      color: $text-heading;
    }
  }
}

.eia-step {
  padding: 32px 24px;
  text-align: center;

  &__number {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    opacity: 0.5;
    line-height: 1;
    margin-bottom: 8px;
  }

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: $purple;
  }

  &__title {
    font-size: $h4;
    color: $text-heading;
    margin-bottom: 12px;
  }

  &__desc {
    color: $text-body;
    font-size: $small;
    line-height: 1.7;
  }

  &__sub {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
    text-align: left;
  }

  &__sub-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $small;
    color: $text-body;

    svg {
      color: $orange;
      flex-shrink: 0;
    }
  }
}

.eia-solution {
  padding: 8px;

  &__step {
    display: block;
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 8px;
    opacity: 0.35;
    background: linear-gradient(135deg, $purple, $orange);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: $purple;
  }

  &__title {
    font-size: $body;
    color: $text-heading;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: $small;
    color: $text-muted;
    line-height: 1.6;
  }

  // Compact variant for cards 6+7 (half-height, horizontal)
  &--compact {
    display: flex;
    align-items: center;
    gap: 14px;
    text-align: left;
    padding: 4px;

    .eia-solution__step {
      font-size: 1.8rem;
      margin-bottom: 0;
    }

    .eia-solution__icon {
      width: 40px;
      height: 40px;
      margin: 0;
      flex-shrink: 0;
    }

    .eia-solution__title {
      margin-bottom: 4px;
      font-size: $small;
    }

    .eia-solution__desc {
      font-size: $xs;
      line-height: 1.4;
    }
  }
}

.eia-solutions__note {
  color: $text-muted;
  font-size: $small;
  font-style: italic;
}

.eia-reassure {
  padding: 8px;

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($purple, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: $purple;
  }

  &__title {
    font-size: $body;
    color: $text-heading;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: $small;
    color: $text-muted;
    line-height: 1.6;
  }
}
</style>
