<template>
  <div>
    <!-- Hero -->
    <section class="accomp-hero section--dark">
      <div class="accomp-hero__bg">
        <div class="orb orb--purple accomp-hero__orb accomp-hero__orb--1"></div>
        <div class="orb orb--orange accomp-hero__orb accomp-hero__orb--2"></div>
      </div>
      <div class="container accomp-hero__content text-center">
        <ScrollReveal>
          <GlassBadge variant="orange">
            <Bot :size="14" />
            Accompagnement IA
          </GlassBadge>
        </ScrollReveal>
        <TextSplit
          text="De l'idée au décollage, boosté par l'IA"
          tag="h1"
          :delay="0.3"
          class="accomp-hero__title"
        />
        <ScrollReveal :delay="0.6">
          <p class="accomp-hero__subtitle">
            Un accompagnement en 3 piliers pour transformer ton idée en business rentable
            — avec l'IA comme copilote à chaque étape.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <!-- Autonome vs Accompagné -->
    <section class="choice section--dark">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Choisis ton parcours</span>
          <h2 class="section-title text-center text-white">
            Comment veux-tu <span class="gradient-text">avancer</span> ?
          </h2>
        </ScrollReveal>

        <StaggerGrid class="choice__grid">
          <!-- Accompagné -->
          <div class="choice__card glass-card choice__card--active">
            <div class="choice__icon">
              <Users :size="32" />
            </div>
            <GlassBadge variant="orange">Recommandé</GlassBadge>
            <h3 class="choice__title">J'ai besoin d'un accompagnement</h3>
            <p class="choice__subtitle">On lance ensemble, main dans la main</p>
            <p class="choice__desc">
              Un accompagnement personnalisé à chaque étape : de l'idée au lancement.
              Kevin t'accompagne pour transformer tes ambitions en succès durable.
            </p>
            <ul class="choice__list">
              <li><CheckCircle :size="16" /> Plan d'action personnalisé</li>
              <li><CheckCircle :size="16" /> Conseils stratégiques sur mesure</li>
              <li><CheckCircle :size="16" /> Avance à ton rythme</li>
              <li><CheckCircle :size="16" /> Outils pratiques et performants</li>
              <li><CheckCircle :size="16" /> IA intégrée à chaque étape</li>
            </ul>
            <AppButton variant="primary" block :href="externalLinks.booking.brevoMeeting">
              Prendre rendez-vous
              <ArrowRight :size="18" />
            </AppButton>
          </div>

          <!-- Autonome -->
          <div class="choice__card glass-card">
            <div class="choice__icon choice__icon--purple">
              <Rocket :size="32" />
            </div>
            <GlassBadge variant="purple">Indépendant</GlassBadge>
            <h3 class="choice__title">Je suis autonome</h3>
            <p class="choice__subtitle">Mode warrior : voici le blueprint</p>
            <p class="choice__desc">
              Tu veux tout faire toi-même ? Accède à toutes nos formations en ligne,
              avec des outils concrets et prêts à l'emploi pour avancer à ton rythme.
            </p>
            <ul class="choice__list">
              <li><CheckCircle :size="16" /> Liberté totale</li>
              <li><CheckCircle :size="16" /> Contenu 100% en ligne</li>
              <li><CheckCircle :size="16" /> Accessible immédiatement</li>
              <li><CheckCircle :size="16" /> Outils concrets et prêts à l'emploi</li>
              <li><CheckCircle :size="16" /> Formation éligible CPF</li>
            </ul>
            <AppButton variant="outline-light" block :href="externalLinks.training.formationSubdomain">
              Voir les formations
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </StaggerGrid>
      </div>
    </section>

    <!-- 3 Pillars -->
    <section v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar section--dark" :style="{ background: index % 2 === 0 ? '#0A0514' : '#110B24' }">
      <div class="container">
        <div :class="['split', { 'split--reverse': index % 2 !== 0 }]">
          <ScrollReveal :direction="index % 2 === 0 ? 'left' : 'right'">
            <div class="pillar__icon-wrap">
              <component :is="pillar.icon" :size="48" class="pillar__icon" />
            </div>
            <span class="section-label">Pilier {{ index + 1 }}</span>
            <h2 class="section-title text-white">{{ pillar.title }}</h2>
            <p class="pillar__desc">{{ pillar.description }}</p>
            <div class="pillar__features">
              <div v-for="feature in pillar.features" :key="feature" class="pillar__feature">
                <CheckCircle :size="18" class="pillar__check" />
                <span>{{ feature }}</span>
              </div>
            </div>
            <AppButton v-if="pillar.cta" variant="ghost" :to="pillar.cta.to" :href="pillar.cta.href" class="mt-32">
              {{ pillar.cta.text }}
              <ArrowRight :size="16" />
            </AppButton>
          </ScrollReveal>

          <ScrollReveal :direction="index % 2 === 0 ? 'right' : 'left'">
            <GlassCard>
              <div class="pillar__card-content text-center">
                <component :is="pillar.icon" :size="40" class="pillar__card-icon" />
                <h3 class="text-white mt-16">{{ pillar.cardTitle }}</h3>
                <p class="text-muted mt-8" style="font-size: 0.875rem">{{ pillar.cardDesc }}</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- IA Incluse Callout -->
    <section class="ia-callout section--dark">
      <div class="container">
        <ScrollReveal>
          <div class="ia-callout__card">
            <div class="ia-callout__icon">
              <Bot :size="40" />
            </div>
            <span class="section-label text-center">IA Incluse</span>
            <h2 class="section-title text-center text-white">
              Ton projet sera pensé pour le <span class="gradient-text">monde d'aujourd'hui</span>
            </h2>
            <p class="ia-callout__text">
              En 2026, lancer un business sans intégrer l'IA, c'est partir avec un handicap.
              Kevin s'assure que ton projet est moderne, compétitif et prêt pour le monde de demain.
            </p>
            <AppButton variant="primary" to="/ia">
              Décoller avec l'IA
              <ArrowRight :size="18" />
            </AppButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Bottom CTA -->
    <CTASection
      title="Prêt à passer à l'action ?"
      subtitle="Réserve un appel gratuit avec Kevin pour définir ton plan d'action."
      primaryText="Prendre rendez-vous"
      :primaryLink="externalLinks.booking.brevoBilan"
      secondaryText="Voir les formations"
      :secondaryLink="externalLinks.training.formationSubdomain"
    />
  </div>
</template>

<script setup lang="ts">
import { Lightbulb, Rocket, TrendingUp, CheckCircle, Users, ArrowRight, Bot } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

useHead({ title: 'Accompagnement' })

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Accompagnement IA' })
  trackViewItem({ content_name: 'Accompagnement IA' })
})

const pillars = [
  {
    icon: Lightbulb,
    title: "Trouver l'idée",
    description: "Tu as envie d'entreprendre mais tu ne sais pas par où commencer ? On t'aide à identifier l'idée qui te correspond grâce à l'IA et au bilan de compétences — en alignant tes forces, tes passions et les opportunités du marché.",
    features: [
      'Bilan de compétences personnalisé',
      'Analyse de marché assistée par l\'IA',
      'Validation de l\'idée avec des outils concrets',
      'Coaching Ikigaï pour trouver ta voie',
    ],
    cardTitle: 'Se Connaître',
    cardDesc: 'Identifie tes forces et ton marché idéal',
    cta: null,
  },
  {
    icon: Rocket,
    title: 'Se lancer',
    description: "L'idée est là, il est temps de passer à l'action. De la création d'entreprise au premier client payant en 8 semaines — pas 8 mois. L'IA accélère chaque étape.",
    features: [
      'Choix du statut juridique optimal',
      'Business plan et prévisionnel',
      'Stratégie marketing digitale + IA',
      'Formation offerte du catalogue (valeur 200€)',
    ],
    cardTitle: 'Se Lancer',
    cardDesc: 'Du premier jour au premier client payant',
    cta: null,
  },
  {
    icon: TrendingUp,
    title: 'Décoller avec l\'IA',
    description: "Ton business tourne, mais comment scaler ? L'IA est ton levier de croissance : automatise tes process, booste ton acquisition client et multiplie tes revenus intelligemment.",
    features: [
      'Automatisation des tâches répétitives',
      'Marketing et vente boostés par l\'IA',
      'Outils IA pour la productivité',
      'Audit IA personnalisé de ton business',
    ],
    cardTitle: 'Décoller',
    cardDesc: 'Scale ton business avec l\'IA comme copilote',
    cta: { text: 'En savoir plus', to: '/ia' },
  },
]
</script>

<style lang="scss" scoped>
.accomp-hero {
  padding: 140px 0 80px;
  background: $gradient-hero;
  position: relative;
  overflow: hidden;

  &__bg { position: absolute; inset: 0; pointer-events: none; }
  &__orb {
    position: absolute;
    &--1 { width: 400px; height: 400px; top: -15%; right: -5%; opacity: 0.2; }
    &--2 { width: 250px; height: 250px; bottom: 0; left: 10%; opacity: 0.15; }
  }

  &__content { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
  &__title { font-size: $h1; color: $text-white; margin: 24px 0; }
  &__subtitle { color: $text-on-dark-muted; font-size: $body-lg; line-height: 1.7; }
}

// Autonome vs Accompagné
.choice {
  background: $bg-dark-2;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 48px;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  &__card {
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    transition: all 0.4s $ease-smooth;

    &--active {
      border-color: rgba($orange, 0.3);
      box-shadow: 0 0 40px rgba($orange, 0.1);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba($orange, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $orange;
    margin-bottom: 16px;

    &--purple { background: rgba($purple, 0.15); color: $purple-light; }
  }

  &__title {
    font-size: $h3;
    color: $text-white;
    margin: 12px 0 4px;
  }

  &__subtitle {
    font-size: $small;
    color: $orange;
    font-weight: 600;
    margin-bottom: 12px;
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $small;
    line-height: 1.7;
    margin-bottom: 20px;
  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
    flex: 1;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
      color: $text-on-dark;
      font-size: $small;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 12px;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      svg {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        padding: 5px;
        border-radius: 50%;
        background: rgba($orange, 0.12);
        color: $orange;
      }
    }
  }
}

// Pillars
.pillar {
  &__icon-wrap {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba($purple, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  &__icon { color: $purple-light; }

  &__desc {
    color: $text-on-dark-muted;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  &__features {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-on-dark;
    font-size: $small;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__check {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 50%;
    background: rgba($orange, 0.12);
    color: $orange;
  }

  &__card-content { padding: 20px; }
  &__card-icon { color: $orange; }
}

// IA Callout
.ia-callout {
  background: $bg-dark-2;

  &__card {
    background: linear-gradient(135deg, rgba($purple, 0.12), rgba($orange, 0.08));
    border: 1px solid rgba($purple, 0.2);
    border-radius: $radius-lg;
    padding: 60px 40px;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;

    @media (max-width: 640px) { padding: 40px 24px; }
  }

  &__icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba($orange, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $orange;
    margin: 0 auto 24px;
  }

  &__text {
    color: $text-on-dark-muted;
    font-size: $body;
    line-height: 1.8;
    margin: 0 auto 32px;
    max-width: 550px;
  }
}
</style>
