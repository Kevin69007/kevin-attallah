<template>
  <div>
    <!-- Hero -->
    <section class="ia-hero">
      <div class="container ia-hero__content text-center">
        <span class="ia-hero__label">INTELLIGENCE_ARTIFICIELLE_</span>
        <h1 class="ia-hero__title">
          L'IA NE REMPLACE PAS LES ENTREPRENEURS. ELLE REMPLACE CEUX QUI REFUSENT.
        </h1>
        <p class="ia-hero__subtitle">
          Tes concurrents automatisent déjà. Toi tu écris encore tes emails un par un.
          Il est temps de changer ça.
        </p>
        <div class="ia-hero__ctas">
          <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
            Réserver mon audit IA
            <ArrowRight :size="20" />
          </AppButton>
          <AppButton variant="ghost-light" size="lg" to="/formations">
            Voir les formations IA
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Who is it for -->
    <section class="ia-who">
      <div class="container">
        <span class="brutal-label">POUR_QUI_</span>
        <h2 class="brutal-title">
          QUE TU DÉMARRES OU QUE TU SCALES
        </h2>

        <div class="ia-who__grid">
          <div class="brutal-card">
            <div class="ia-who__card">
              <div class="ia-who__icon">
                <Rocket :size="32" />
              </div>
              <h3 class="ia-who__title">TU LANCES TON BUSINESS</h3>
              <p class="ia-who__desc">
                Démarre avec 10 ans d'avance sur tes futurs concurrents.
                L'IA t'aide à valider ton idée, créer ton contenu, automatiser ton marketing
                et trouver tes premiers clients, le tout en une fraction du temps.
              </p>
              <ul class="ia-who__list">
                <li><CheckCircle :size="16" /> Validation d'idée accélérée par l'IA</li>
                <li><CheckCircle :size="16" /> Création de contenu automatisée</li>
                <li><CheckCircle :size="16" /> Marketing digital intelligent</li>
                <li><CheckCircle :size="16" /> Chatbots et service client IA</li>
              </ul>
            </div>
          </div>

          <div class="brutal-card brutal-card--orange">
            <div class="ia-who__card">
              <div class="ia-who__icon ia-who__icon--orange">
                <TrendingUp :size="32" />
              </div>
              <h3 class="ia-who__title">TU AS DÉJÀ UNE ENTREPRISE</h3>
              <p class="ia-who__desc">
                Optimise tes process, automatise le répétitif, scale intelligemment.
                L'IA transforme ton business existant en machine de guerre : plus rapide,
                plus efficace, plus rentable.
              </p>
              <ul class="ia-who__list">
                <li><CheckCircle :size="16" /> Automatisation des tâches répétitives</li>
                <li><CheckCircle :size="16" /> Analyse de données et KPIs intelligents</li>
                <li><CheckCircle :size="16" /> Vente et prospection boostées par l'IA</li>
                <li><CheckCircle :size="16" /> Productivité x10 avec les bons outils</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3 Solutions -->
    <section class="ia-solutions">
      <div class="container">
        <span class="brutal-label">SOLUTIONS_</span>
        <h2 class="brutal-title">
          3 FAÇONS DE DÉCOLLER AVEC L'IA
        </h2>

        <div class="ia-solutions__grid">
          <div v-for="(solution, i) in solutions" :key="solution.title" class="brutal-card">
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
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="ia-stats">
      <div class="container">
        <div class="ia-stats__grid">
          <div v-for="stat in stats" :key="stat.label" class="brutal-card ia-stats__item">
            <span class="ia-stats__value">
              <CountUp :end="stat.value" :suffix="stat.suffix" />
            </span>
            <span class="ia-stats__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="ia-cta">
      <div class="container">
        <div class="brutal-card brutal-card--cta">
          <h2 class="ia-cta__title">PRÊT À INTÉGRER L'IA DANS TON BUSINESS ?</h2>
          <p class="ia-cta__subtitle">Réserve un audit gratuit avec Kevin pour identifier tes leviers IA.</p>
          <div class="ia-cta__buttons">
            <AppButton variant="primary" size="lg" :href="externalLinks.booking.brevoMeeting">
              Réserver mon audit IA
              <ArrowRight :size="20" />
            </AppButton>
            <AppButton variant="ghost-light" size="lg" to="/formations">
              Voir les formations
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Bot, Rocket, TrendingUp, CheckCircle, ArrowRight, GraduationCap, Search, Wrench } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

useHead({
  title: 'Décoller avec l\'IA',
  meta: [{ name: 'description', content: 'Intègre l\'intelligence artificielle dans ton business. Formations IA, audit personnalisé et accompagnement par Kevin Attallah.' }],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Intelligence Artificielle' })
  trackViewItem({ content_name: 'Intelligence Artificielle' })
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
/* ── Brutalist shared ── */
.brutal-label {
  display: block;
  font-family: $font-mono;
  font-size: $xs;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: $purple;
  margin-bottom: 12px;
  font-weight: 700;
}

.brutal-title {
  font-family: $font-heading;
  font-size: $h2;
  font-weight: 900;
  text-transform: uppercase;
  color: #000;
  line-height: 1.1;
  margin-bottom: 48px;
}

.brutal-card {
  background: #fff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px $purple;
  padding: 32px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 12px 12px 0px $purple;
  }

  &--orange {
    box-shadow: 8px 8px 0px $orange;
    &:hover { box-shadow: 12px 12px 0px $orange; }
  }

  &--cta {
    background: #000;
    color: #fff;
    box-shadow: 8px 8px 0px $orange;
    text-align: center;
    padding: 64px 48px;
    &:hover { box-shadow: 12px 12px 0px $orange; }
  }
}

/* ── Hero ── */
.ia-hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 4px solid #000;
  padding-top: 120px;
  padding-bottom: 80px;

  &__label {
    display: inline-block;
    font-family: $font-mono;
    font-size: $xs;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: $purple;
    border: 2px solid $purple;
    padding: 6px 16px;
    font-weight: 700;
    margin-bottom: 24px;
  }

  &__content { max-width: 800px; margin: 0 auto; }

  &__title {
    font-family: $font-heading;
    font-size: $h1;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin: 0 0 24px;
    line-height: 1.1;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $body-lg;
    color: #000;
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

/* ── Who section ── */
.ia-who {
  background: #fff;
  border-bottom: 4px solid #000;
  padding: 80px 0;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  &__card { padding: 0; }

  &__icon {
    width: 64px;
    height: 64px;
    border: 4px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
    margin-bottom: 20px;

    &--orange { color: $orange; }
  }

  &__title {
    font-family: $font-heading;
    font-size: $h4;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 12px;
  }

  &__desc {
    font-family: $font-mono;
    color: #000;
    font-size: $small;
    line-height: 1.7;
    margin-bottom: 20px;
  }

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
      color: #000;
      font-family: $font-mono;
      font-size: $small;

      svg { color: $purple; flex-shrink: 0; }
    }
  }
}

/* ── Solutions ── */
.ia-solutions {
  background: #fff;
  border-bottom: 4px solid #000;
  padding: 80px 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }
}

.ia-sol {
  text-align: center;

  &__num {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 900;
    color: $purple;
    line-height: 1;
  }

  &__icon {
    width: 56px;
    height: 56px;
    border: 4px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $purple;
    margin: 12px auto 16px;
  }

  &__title {
    font-family: $font-heading;
    font-size: $body-lg;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 10px;
  }

  &__desc {
    font-family: $font-mono;
    font-size: $small;
    color: #000;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  &__features {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;

    li {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      font-family: $font-mono;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #000;
      background: #fff;
      border: 2px solid #000;
      white-space: nowrap;
    }
  }
}

/* ── Stats ── */
.ia-stats {
  background: #fff;
  border-bottom: 4px solid #000;
  padding: 80px 0;

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
    color: $purple;
    display: block;
    margin-bottom: 8px;
  }

  &__label {
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

/* ── CTA ── */
.ia-cta {
  background: #fff;
  padding: 80px 0;

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    font-weight: 900;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $body-lg;
    color: rgba(#fff, 0.8);
    margin-bottom: 32px;
  }

  &__buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
