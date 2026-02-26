<template>
  <div>
    <!-- Hero -->
    <section class="ia-hero section--dark">
      <div class="ia-hero__bg">
        <div class="orb orb--orange ia-hero__orb ia-hero__orb--1"></div>
        <div class="orb orb--purple ia-hero__orb ia-hero__orb--2"></div>
      </div>
      <div class="container ia-hero__content text-center">
        <ScrollReveal :delay="0.1">
          <GlassBadge variant="orange">
            <Bot :size="14" />
            Intelligence Artificielle
          </GlassBadge>
        </ScrollReveal>
        <TextSplit
          text="L'IA ne remplace pas les entrepreneurs. Elle remplace ceux qui refusent"
          tag="h1"
          :delay="0.3"
          class="ia-hero__title"
        />
        <ScrollReveal :delay="0.6">
          <p class="ia-hero__subtitle">
            Tes concurrents automatisent déjà. Toi tu écris encore tes emails un par un.
            Il est temps de changer ça.
          </p>
        </ScrollReveal>
        <ScrollReveal :delay="0.8">
          <div class="ia-hero__ctas">
            <AppButton variant="primary" size="lg" href="https://meet.brevo.com/kevin-a2ta2l/presentation">
              Réserver mon audit IA
              <ArrowRight :size="20" />
            </AppButton>
            <AppButton variant="ghost" size="lg" to="/formations">
              Voir les formations IA
            </AppButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Who is it for -->
    <section class="ia-who section--dark">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Pour qui ?</span>
          <h2 class="section-title text-center text-white">
            Que tu démarres ou que tu <span class="gradient-text">scales</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="ia-who__grid">
          <GlassCard hoverable>
            <div class="ia-who__card">
              <div class="ia-who__icon">
                <Rocket :size="32" />
              </div>
              <h3 class="ia-who__title">Tu lances ton business</h3>
              <p class="ia-who__desc">
                Démarre avec 10 ans d'avance sur tes futurs concurrents.
                L'IA t'aide à valider ton idée, créer ton contenu, automatiser ton marketing
                et trouver tes premiers clients — le tout en une fraction du temps.
              </p>
              <ul class="ia-who__list">
                <li><CheckCircle :size="16" /> Validation d'idée accélérée par l'IA</li>
                <li><CheckCircle :size="16" /> Création de contenu automatisée</li>
                <li><CheckCircle :size="16" /> Marketing digital intelligent</li>
                <li><CheckCircle :size="16" /> Chatbots et service client IA</li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard hoverable>
            <div class="ia-who__card">
              <div class="ia-who__icon ia-who__icon--orange">
                <TrendingUp :size="32" />
              </div>
              <h3 class="ia-who__title">Tu as déjà une entreprise</h3>
              <p class="ia-who__desc">
                Optimise tes process, automatise le répétitif, scale intelligemment.
                L'IA transforme ton business existant en machine de guerre — plus rapide,
                plus efficace, plus rentable.
              </p>
              <ul class="ia-who__list">
                <li><CheckCircle :size="16" /> Automatisation des tâches répétitives</li>
                <li><CheckCircle :size="16" /> Analyse de données et KPIs intelligents</li>
                <li><CheckCircle :size="16" /> Vente et prospection boostées par l'IA</li>
                <li><CheckCircle :size="16" /> Productivité x10 avec les bons outils</li>
              </ul>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- 3 Solutions -->
    <section class="ia-solutions section--dark">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Nos solutions</span>
          <h2 class="section-title text-center text-white">
            3 façons de <span class="gradient-text">décoller</span> avec l'IA
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-3 mt-48">
          <GlassCard v-for="(solution, i) in solutions" :key="solution.title" hoverable>
            <div class="ia-sol">
              <span class="ia-sol__num">0{{ i + 1 }}</span>
              <div class="ia-sol__icon">
                <component :is="solution.icon" :size="28" />
              </div>
              <h3 class="ia-sol__title">{{ solution.title }}</h3>
              <p class="ia-sol__desc">{{ solution.description }}</p>
              <ul class="ia-sol__features">
                <li v-for="f in solution.features" :key="f">{{ f }}</li>
              </ul>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- Stats -->
    <section class="ia-stats section--dark">
      <div class="container">
        <StaggerGrid class="ia-stats__grid">
          <div v-for="stat in stats" :key="stat.label" class="ia-stats__item glass-card">
            <span class="ia-stats__value gradient-text">
              <CountUp :end="stat.value" :suffix="stat.suffix" />
            </span>
            <span class="ia-stats__label">{{ stat.label }}</span>
          </div>
        </StaggerGrid>
      </div>
    </section>

    <!-- CTA -->
    <CTASection
      title="Prêt à intégrer l'IA dans ton business ?"
      subtitle="Réserve un audit gratuit avec Kevin pour identifier tes leviers IA."
      primaryText="Réserver mon audit IA"
      primaryLink="https://meet.brevo.com/kevin-a2ta2l/presentation"
      secondaryText="Voir les formations"
      secondaryLink="/formations"
    />
  </div>
</template>

<script setup lang="ts">
import { Bot, Rocket, TrendingUp, CheckCircle, ArrowRight, GraduationCap, Search, Wrench } from 'lucide-vue-next'

useHead({
  title: 'Décoller avec l\'IA',
  meta: [{ name: 'description', content: 'Intègre l\'intelligence artificielle dans ton business. Formations IA, audit personnalisé et accompagnement par Kevin Attallah.' }],
})

const solutions = [
  {
    icon: GraduationCap,
    title: 'Formations IA',
    description: 'Maîtrise les outils qui changent la donne : ChatGPT, automatisation, marketing IA, vente IA, productivité.',
    features: ['ChatGPT avancé', 'Automatisation marketing', 'IA pour la vente', 'Productivité boostée'],
  },
  {
    icon: Search,
    title: 'Audit IA personnalisé',
    description: 'On analyse ton business et on identifie les leviers IA qui te font gagner du temps et de l\'argent.',
    features: ['Diagnostic complet', 'Plan d\'action IA', 'ROI estimé', 'Priorisation des actions'],
  },
  {
    icon: Wrench,
    title: 'Accompagnement IA',
    description: 'Outils concrets et suivi personnalisé pour intégrer l\'IA dans ton quotidien d\'entrepreneur.',
    features: ['Outils prêts à l\'emploi', 'Suivi mensuel', 'Support illimité', 'Mises à jour incluses'],
  },
]

const stats = [
  { value: 2100, suffix: '+', label: 'Entrepreneurs accompagnés' },
  { value: 60, suffix: '+', label: 'Formations disponibles' },
  { value: 98, suffix: '%', label: 'Taux de satisfaction' },
  { value: 10, suffix: 'x', label: 'Productivité moyenne' },
]
</script>

<style lang="scss" scoped>
.ia-hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: $gradient-hero;
  padding-top: 120px;
  padding-bottom: 80px;

  &__bg { position: absolute; inset: 0; pointer-events: none; }
  &__orb {
    position: absolute;
    &--1 { width: 500px; height: 500px; top: -15%; right: -10%; opacity: 0.2; }
    &--2 { width: 300px; height: 300px; bottom: -10%; left: -5%; opacity: 0.15; }
  }

  &__content { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
  &__title { font-size: $h1; color: $text-white; margin: 24px 0; line-height: 1.1; }
  &__subtitle { font-size: $body-lg; color: $text-on-dark-muted; line-height: 1.7; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
  &__ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
}

.ia-who {
  background: $bg-dark-2;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 48px;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  &__card { padding: 8px; }
  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba($purple, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple-light;
    margin-bottom: 20px;

    &--orange { background: rgba($orange, 0.15); color: $orange; }
  }

  &__title { font-size: $h4; color: $text-white; margin-bottom: 12px; }
  &__desc { color: $text-on-dark-muted; font-size: $small; line-height: 1.7; margin-bottom: 20px; }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      color: $text-on-dark;
      font-size: $small;

      svg { color: $orange; flex-shrink: 0; }
    }
  }
}

.ia-solutions { background: $bg-dark-1; }

.ia-sol {
  text-align: center;
  padding: 8px;

  &__num {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    background: $gradient-primary;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.25;
    line-height: 1;
  }

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba($purple, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple-light;
    margin: 12px auto 16px;
  }

  &__title { font-size: $body-lg; color: $text-white; margin-bottom: 10px; font-weight: 700; }
  &__desc { font-size: $small; color: $text-on-dark-muted; line-height: 1.6; margin-bottom: 16px; }

  &__features {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: $xs;
      color: $text-on-dark-muted;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 8px;
    }
  }
}

.ia-stats {
  background: $bg-dark-2;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  }

  &__item { text-align: center; padding: 32px 20px; }

  &__value {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 900;
    display: block;
    margin-bottom: 8px;
  }

  &__label {
    font-size: $xs;
    color: $text-on-dark-muted;
  }
}
</style>
