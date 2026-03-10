<template>
  <div>
    <!-- Hero -->
    <section class="ce-hero section--light">
      <div class="ce-hero__bg">
        <div class="orb orb--purple ce-hero__orb ce-hero__orb--1"></div>
        <div class="orb orb--orange ce-hero__orb ce-hero__orb--2"></div>
      </div>
      <div class="container">
        <div class="split ce-hero__split">
          <ScrollReveal direction="left">
            <h1 class="ce-hero__title">
              Ton entreprise, de l'idée au lancement —
              <span class="gradient-text">avec l'IA comme accélérateur.</span>
            </h1>
            <p class="ce-hero__subtitle">
              On commence par le plus dur : trouver la bonne idée, s'assurer qu'elle te correspond
              vraiment, puis on construit tout le reste. De A à Z.
            </p>
            <div class="hero__trust mt-32">
              <div v-magnetic="0.2" class="hero__trust-item glass-badge-light">
                <Users :size="16" />
                <span><strong>2 100+</strong> entrepreneurs lancés</span>
              </div>
              <div v-magnetic="0.2" class="hero__trust-item glass-badge-light">
                <Star :size="16" />
                <span><strong>4.8/5</strong> satisfaction client</span>
              </div>
              <div v-magnetic="0.2" class="hero__trust-item glass-badge-light">
                <Award :size="16" />
                <span><strong>100%</strong> finançable</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div v-magnetic="0.12" class="ce-hero__image glass-card-light">
              <NuxtImg src="/img/banner-right-img.jpg" alt="Créer mon entreprise" format="webp" quality="80" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section class="ce-modules section--white">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Ce qu'on couvre ensemble</span>
          <h2 class="section-title text-center">
            Un programme complet, pensé pour <span class="gradient-text">passer à l'action.</span>
          </h2>
        </ScrollReveal>

        <StaggerGrid class="grid grid-bento-7 mt-48" :stagger="0.1">
          <GlassCard v-for="(mod, i) in modules" :key="mod.title" variant="light">
            <div class="ce-module" :class="i >= 5 ? 'ce-module--compact' : 'text-center'">
              <span class="ce-module__step">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="ce-module__icon">
                <component :is="mod.icon" :size="28" />
              </div>
              <div>
                <h4 class="ce-module__title">{{ mod.title }}</h4>
                <p class="ce-module__desc">{{ mod.description }}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- Two Formulas -->
    <section id="formulas" class="ce-formulas section--light">
      <div class="container">
        <ScrollReveal>
          <span class="section-label text-center">Deux façons de se lancer</span>
          <h2 class="section-title text-center">
            Selon ton <span class="gradient-text">rythme.</span>
          </h2>
        </ScrollReveal>

        <div class="grid grid-2 mt-48">
          <!-- Card 1: Autonomie -->
          <ScrollReveal direction="left">
            <div v-magnetic="0.15" class="ce-formula glass-card-light">
              <GlassBadge variant="light">Formation en autonomie</GlassBadge>
              <p class="ce-formula__subtitle mt-16">Accessible 24h/24 — 7j/7</p>
              <p class="ce-formula__desc">
                Accède à l'intégralité du programme en ligne, avance à ton rythme, et construis
                ton projet pas à pas avec des modules concrets et actionnables.
              </p>
              <div class="ce-formula__checks">
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Accès immédiat et à vie</span>
                </div>
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Formation complémentaire offerte</span>
                </div>
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Contenu mis à jour</span>
                </div>
              </div>
              <div class="ce-formula__price">
                <span class="ce-formula__amount">299€</span>
              </div>
              <AppButton variant="primary" block :disabled="isLoading" @click="handlePurchase">
                <Loader2 v-if="isLoading" :size="18" class="ce-formula__spin" />
                {{ isLoading ? 'Chargement...' : 'Je me lance' }}
                <ArrowRight v-if="!isLoading" :size="18" />
              </AppButton>
              <div class="ce-formula__trust">
                <Shield :size="14" />
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </ScrollReveal>

          <!-- Card 2: Accompagnement -->
          <ScrollReveal direction="right">
            <div v-magnetic="0.15" class="ce-formula glass-card-light ce-formula--highlight">
              <GlassBadge variant="orange-light">Accompagnement personnalisé</GlassBadge>
              <p class="ce-formula__subtitle mt-16">Formation live + modules pratiques + suivi</p>
              <p class="ce-formula__desc">
                Un vrai accompagnement sur mesure : sessions live avec Kevin, modules pratiques,
                et un suivi personnalisé jusqu'au lancement de ton activité.
              </p>
              <div class="ce-formula__checks">
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Sessions live avec Kevin</span>
                </div>
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Modules pratiques complets</span>
                </div>
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>Formation complémentaire offerte</span>
                </div>
                <div class="ce-formula__check">
                  <CheckCircle :size="16" />
                  <span>100% finançable</span>
                </div>
              </div>
              <AppButton variant="primary" block :href="externalLinks.booking.brevoMeeting">
                Je veux être accompagné
                <ArrowRight :size="18" />
              </AppButton>
              <div class="ce-formula__trust">
                <Shield :size="14" />
                <span>Appel gratuit, sans engagement</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Reassurance Mosaic -->
    <ImageMosaic :images="mosaicImages">
      <ScrollReveal>
        <span class="section-label">Pourquoi c'est différent</span>
        <h2 class="section-title">
          Ce qui nous <span class="gradient-text">distingue.</span>
        </h2>
        <p class="mosaic-subtitle">
          On commence par toi, pas par le business plan. L'IA est intégrée dès le départ, et derrière la formation, un vrai entrepreneur.
        </p>
        <AppButton variant="primary" :href="externalLinks.booking.brevoMeeting" class="mt-24">
          En savoir plus <ArrowRight :size="16" />
        </AppButton>
      </ScrollReveal>
    </ImageMosaic>

    <!-- Final CTA -->
    <CTASection
      title="Prêt à te lancer ?"
      subtitle="Un appel gratuit de 30 minutes pour faire le point sur ton projet et trouver la formule adaptée."
      primaryText="Je réserve mon appel gratuit"
      :primaryHref="externalLinks.booking.brevoMeeting"
      secondaryText=""
    />

    <!-- Exit Intent Popup -->
    <KitLancementModal
      :visible="kitIntent.triggered.value && !kitIntent.dismissed.value"
      @close="kitIntent.dismiss()"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Lightbulb, CheckCircle, Scale, BarChart3, Megaphone, Bot, Gift,
  ArrowRight, Award, Users, Star, Shield, Loader2,
} from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

useHead({
  title: 'Créer mon entreprise',
  meta: [
    {
      name: 'description',
      content: 'Créez votre entreprise de A à Z avec l\'IA comme accélérateur. Formation en autonomie ou accompagnement personnalisé — 100% finançable.',
    },
  ],
})

const { trackViewContent } = useFBPixel()
const { trackViewItem } = useGoogleAds()
onMounted(() => {
  trackViewContent({ content_name: 'Créer mon entreprise' })
  trackViewItem({ content_name: 'Créer mon entreprise' })
})

const kitIntent = useExitIntent({ delay: 8000, scrollThreshold: 0.6, storagePrefix: 'kit' })

const modules = [
  { icon: Lightbulb, title: 'Trouver & valider ton idée', description: 'Identifie une idée qui te correspond vraiment et qui a un potentiel business réel.' },
  { icon: CheckCircle, title: 'Valider que le marché suit', description: 'Étudie ton marché, ta cible et la concurrence avant de te lancer.' },
  { icon: Scale, title: 'Choisir la bonne structure', description: 'Micro-entreprise, SASU, SARL — on t\'aide à choisir la forme adaptée.' },
  { icon: BarChart3, title: 'Business plan & financement', description: 'Construis un plan solide pour convaincre et financer ton projet.' },
  { icon: Megaphone, title: 'Marketing & développement commercial', description: 'Trouve tes premiers clients et mets en place ta stratégie de croissance.' },
  { icon: Bot, title: 'L\'IA comme copilote dès le départ', description: 'Intègre l\'IA dans tes process pour gagner du temps et de l\'efficacité.' },
  { icon: Gift, title: 'Une formation offerte au choix', description: 'En bonus, choisis une formation complémentaire pour combler tes lacunes.' },
]

const mosaicImages = Array.from({ length: 20 }, (_, i) => `/img/mosaic/${String(i + 1).padStart(2, '0')}.jpg`)

// Payment for autonomie formula
const router = useRouter()
const isLoading = ref(false)

const { trackAddToCart } = useFBPixel()
const { trackAddToCart: gTrackAddToCart } = useGoogleAds()

async function handlePurchase() {
  if (isLoading.value) return

  trackAddToCart({
    content_name: 'Créer mon entreprise — Autonomie',
    content_category: 'Formations',
    content_ids: ['creation-entreprise-autonomie'],
    value: 299,
    currency: 'EUR',
  })
  gTrackAddToCart({
    items: [{ item_name: 'Créer mon entreprise — Autonomie', item_id: 'creation-entreprise-autonomie', price: 299 }],
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
        description: 'Créer mon entreprise — Formation en autonomie',
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
</script>

<style lang="scss" scoped>
.ce-hero {
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

// Reuse hero trust styles from HeroSection
.hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__trust-item {
  font-size: $xs;
  strong { color: $text-heading; }
}

.ce-module {
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
    gap: 16px;
    text-align: left;
    padding: 4px;
    align-items: center;

    .ce-module__step {
      margin-bottom: 4px;
    }

    .ce-module__icon {
      margin: 0;
      flex-shrink: 0;
    }
  }
}

.ce-formulas .grid-2 > :deep(*) {
  height: 100%;
}

.ce-formula {
  padding: 32px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &--highlight {
    border-color: rgba($purple, 0.3);
    box-shadow: 0 0 32px rgba($purple, 0.08);
  }

  &__subtitle {
    font-size: $small;
    color: $text-muted;
    font-weight: 600;
  }

  &__desc {
    color: $text-body;
    font-size: $small;
    line-height: 1.7;
    margin: 16px 0 24px;
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
    font-size: $small;
    color: $text-body;

    svg {
      color: $orange;
      flex-shrink: 0;
    }
  }

  &__price {
    text-align: center;
    margin-bottom: 16px;
  }

  &__amount {
    font-family: $font-heading;
    font-size: 2.5rem;
    font-weight: 800;
    color: $text-heading;
  }

  &__trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-size: $xs;
    color: $text-muted;
  }

  &__spin {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.mosaic-subtitle {
  font-size: $body;
  color: $text-muted;
  line-height: 1.7;
  max-width: 480px;
  margin: 16px auto 0;
}

</style>
