<template>
  <div v-if="formation">
    <!-- Hero -->
    <section class="sale-hero section--dark">
      <div class="sale-hero__bg">
        <div class="orb orb--purple sale-hero__orb sale-hero__orb--1"></div>
        <div class="orb orb--orange sale-hero__orb sale-hero__orb--2"></div>
      </div>
      <div class="container">
        <div class="split sale-hero__split">
          <div class="sale-hero__content">
            <ScrollReveal>
              <GlassBadge variant="orange">
                <Award :size="14" /> Éligible CPF
              </GlassBadge>
            </ScrollReveal>
            <ScrollReveal :delay="0.2">
              <h1 class="sale-hero__title">{{ formation.titre }}</h1>
            </ScrollReveal>
            <ScrollReveal :delay="0.4">
              <p class="sale-hero__desc">{{ formation.description }}</p>
            </ScrollReveal>
            <ScrollReveal :delay="0.6">
              <div class="sale-hero__meta">
                <span><Clock :size="16" /> {{ duree }}h environ</span>
                <span><BarChart3 :size="16" /> {{ formation.niveau }}</span>
                <span><Users :size="16" /> {{ formation.public }}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal :delay="0.8">
              <div class="btn-group">
                <MagneticButton>
                  <AppButton variant="primary" size="lg" @click="scrollToPrice">
                    S'inscrire maintenant
                    <ArrowRight :size="20" />
                  </AppButton>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" :delay="0.4">
            <div class="sale-hero__image glass-card">
              <img :src="formation.image" :alt="formation.titre" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- What you'll learn -->
    <section class="learn section--dark">
      <div class="container">
        <ScrollReveal>
          <span class="section-label">Ce que tu vas apprendre</span>
          <h2 class="section-title text-white">Objectifs pédagogiques</h2>
        </ScrollReveal>
        <StaggerGrid class="grid grid-2 mt-32">
          <div
            v-for="(obj, i) in formation.objectifs_pedagogiques"
            :key="i"
            class="learn__item glass-card"
          >
            <CheckCircle :size="20" class="learn__check" />
            <span>{{ obj }}</span>
          </div>
        </StaggerGrid>
      </div>
    </section>

    <!-- Trust signals -->
    <section class="trust section--dark">
      <div class="container">
        <StaggerGrid class="grid grid-3">
          <GlassCard v-for="signal in trustSignals" :key="signal.title">
            <div class="trust__signal">
              <component :is="signal.icon" :size="32" class="trust__icon" />
              <h4 class="trust__title">{{ signal.title }}</h4>
              <p class="trust__desc">{{ signal.description }}</p>
            </div>
          </GlassCard>
        </StaggerGrid>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="pricing section--dark">
      <div class="container">
        <div class="split">
          <div>
            <ScrollReveal>
              <span class="section-label">Tarif</span>
              <h2 class="section-title text-white">
                Investis dans <span class="gradient-text">ton avenir</span>
              </h2>
              <p class="pricing__text">
                Formation certifiante éligible au CPF. Paiement sécurisé par carte bancaire.
                Accès immédiat dès l'inscription.
              </p>
            </ScrollReveal>

            <!-- Pack selector for anglais/compta -->
            <div v-if="showPacks" class="pricing__packs mt-32">
              <ScrollReveal>
                <h3 class="text-white mb-16">Packs exclusifs</h3>
                <p class="text-muted mb-24" style="font-size: 0.875rem">
                  Économisez en combinant plusieurs formations
                </p>
              </ScrollReveal>
              <div class="pricing__packs-list">
                <label
                  v-for="pack in availablePacks"
                  :key="pack.id"
                  :class="['pricing__pack glass-card', { 'pricing__pack--selected': selectedPacks[pack.id] }]"
                >
                  <input
                    type="checkbox"
                    :checked="selectedPacks[pack.id]"
                    @change="handlePackChange(pack.id, pack.title)"
                  />
                  <div>
                    <strong>{{ pack.title }}</strong>
                    <span class="pricing__pack-save">Économisez {{ pack.savings }}€</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <ScrollReveal direction="right">
            <PriceCard
              :normalPrice="normalAmount"
              :promoPrice="!isExpired ? promoAmount : (hasPackDiscount ? remise : undefined)"
              :badge="!isExpired ? `-${percentage}% OFFRE LIMITÉE` : (hasPackDiscount ? `-${remisep}%` : undefined)"
              :showTimer="!isExpired"
              :ctaText="isLoading ? 'Chargement...' : 'S\'inscrire maintenant'"
              @purchase="createOrder"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section section--dark">
      <div class="container container--narrow">
        <ScrollReveal>
          <span class="section-label text-center">FAQ</span>
          <h2 class="section-title text-center text-white">Questions fréquentes</h2>
        </ScrollReveal>
        <ScrollReveal class="mt-32">
          <FAQAccordion :items="faqItems" />
        </ScrollReveal>
      </div>
    </section>

    <!-- Bottom CTA -->
    <CTASection
      title="Prêt à te lancer ?"
      subtitle="Rejoins les 2100+ entrepreneurs qui ont transformé leur carrière."
      primaryText="S'inscrire maintenant"
      primaryLink="#pricing"
    />

    <!-- Mobile Sticky CTA -->
    <StickyCTA
      :price="!isExpired ? promoAmount : normalAmount"
      :originalPrice="!isExpired ? normalAmount : undefined"
      :visible="showSticky"
      @click="createOrder"
    />
  </div>

  <!-- 404 -->
  <div v-else class="section--dark" style="min-height: 100vh; display: flex; align-items: center; justify-content: center">
    <div class="text-center">
      <h1 class="text-white">Formation introuvable</h1>
      <p class="text-muted mt-16">Cette formation n'existe pas dans notre catalogue.</p>
      <AppButton variant="primary" to="/formations" class="mt-24">Voir le catalogue</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Award, Clock, BarChart3, Users, ArrowRight, CheckCircle, Shield, CreditCard, BookOpen } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { getFormationById } = useFormations()
const { trackViewContent, trackAddToCart } = useFBPixel()

const formation = computed(() => getFormationById(route.params.id as string))

useHead({
  title: computed(() => formation.value?.titre || 'Formation'),
})

// Pricing state
const normalAmount = ref(99)
const promoAmount = ref(69)
const percentage = ref(30)
const remise = ref(99)
const remisep = ref<number | null>(null)
const duree = ref(15)
const isLoading = ref(false)
const showSticky = ref(false)

// Countdown
const { isExpired } = useCountdown(60)

const hasPackDiscount = computed(() => remisep.value !== null)

// Pack system
const selectedPacks = ref<Record<string, boolean>>({
  'anglais-debutant + intermediaire': false,
  'anglais-intermediaire + Avancé': false,
  'anglais-debutant, intermediaire + Avancé': false,
  'compta-initiation + Les Fondamentaux': false,
})

const selectedPackTitle = ref('')

const showPacks = computed(() => {
  const id = formation.value?.id
  return ['anglais-debutant-a1-a2', 'anglais-intermediaire-b1-b2', 'anglais-avance-c1-c2', 'comptabilite-initiation-01'].includes(id || '')
})

const availablePacks = computed(() => {
  const id = formation.value?.id
  if (id === 'anglais-debutant-a1-a2') {
    return [
      { id: 'anglais-debutant + intermediaire', title: 'Pack Débutant + Intermédiaire', savings: 99 },
      { id: 'anglais-debutant, intermediaire + Avancé', title: 'Pack Complet (3 niveaux)', savings: 158 },
    ]
  }
  if (id === 'anglais-intermediaire-b1-b2') {
    return [
      { id: 'anglais-intermediaire + Avancé', title: 'Pack Intermédiaire + Avancé', savings: 99 },
    ]
  }
  if (id === 'comptabilite-initiation-01') {
    return [
      { id: 'compta-initiation + Les Fondamentaux', title: 'Pack Initiation + Fondamentaux', savings: 99 },
    ]
  }
  return []
})

function handlePackChange(id: string, title: string) {
  // Exclusive pack selection logic
  if (id === 'anglais-debutant + intermediaire' || id === 'compta-initiation + Les Fondamentaux') {
    if (!selectedPacks.value[id]) {
      selectedPacks.value['anglais-debutant, intermediaire + Avancé'] = false
    }
  } else if (id === 'anglais-debutant, intermediaire + Avancé') {
    if (!selectedPacks.value[id]) {
      selectedPacks.value['anglais-debutant + intermediaire'] = false
      selectedPacks.value['anglais-intermediaire + Avancé'] = false
    }
  }

  selectedPacks.value[id] = !selectedPacks.value[id]
  selectedPackTitle.value = selectedPacks.value[id] ? title : ''

  calculateAmounts()
}

function calculateAmounts() {
  let n = 99, p = 69, pct = 30, r = 99, rp: number | null = null, d = 15

  if (selectedPacks.value['anglais-debutant + intermediaire']) {
    n += 99; p += 30; pct = 50; r = 138; rp = 30; d = 30
  }
  if (selectedPacks.value['anglais-intermediaire + Avancé'] || selectedPacks.value['compta-initiation + Les Fondamentaux']) {
    n += 99; p += 30; pct = 50; r = 138; rp = 30; d = 30
  }
  if (selectedPacks.value['anglais-debutant, intermediaire + Avancé']) {
    n += 198; p += 70; pct = 53; r = 148; rp = 50; d = 45
  }

  normalAmount.value = n
  promoAmount.value = p
  percentage.value = pct
  remise.value = r
  remisep.value = rp
  duree.value = d
}

// Create order
async function createOrder() {
  if (isLoading.value || !formation.value) return

  const finalAmount = !isExpired.value
    ? promoAmount.value
    : (remisep.value !== null ? remise.value : normalAmount.value)

  if (finalAmount <= 0) return

  trackAddToCart({
    content_name: formation.value.titre,
    content_category: 'Formations',
    content_ids: [formation.value.id],
    value: finalAmount,
    currency: 'EUR',
  })

  isLoading.value = true

  try {
    const data = await $fetch('/api/create-order', {
      method: 'POST',
      body: {
        amount: finalAmount,
        currency: 'EUR',
        description: selectedPackTitle.value || formation.value.titre,
      },
    })

    localStorage.setItem('orderResponse', JSON.stringify(data))
    router.push('/paiement')
  } catch (err: any) {
    console.error('Erreur création commande:', err)
    const { useToast } = await import('vue-toastification')
    useToast().error('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isLoading.value = false
  }
}

function scrollToPrice() {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Sticky CTA visibility
onMounted(() => {
  if (formation.value) {
    trackViewContent({
      content_name: formation.value.titre,
      content_ids: [formation.value.id],
      content_type: 'product',
      value: promoAmount.value,
      currency: 'EUR',
    })
  }

  const onScroll = () => {
    showSticky.value = window.scrollY > 600
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// Trust signals
const trustSignals = [
  { icon: Shield, title: 'Paiement Sécurisé', description: 'Transactions protégées par Revolut avec cryptage SSL 256 bits.' },
  { icon: Award, title: 'Certification CPF', description: 'Formation éligible au Compte Personnel de Formation.' },
  { icon: CreditCard, title: 'Satisfait ou Remboursé', description: 'Garantie de remboursement sous 14 jours.' },
]

// FAQ
const faqItems = [
  { question: 'Comment financer ma formation avec le CPF ?', answer: 'Nos formations sont éligibles au CPF. Contactez-nous pour vérifier votre solde CPF et nous vous accompagnerons dans les démarches administratives.' },
  { question: 'Combien de temps ai-je accès à la formation ?', answer: 'Vous bénéficiez d\'un accès à vie à la formation dès votre inscription. Vous pouvez la suivre à votre rythme.' },
  { question: 'Puis-je obtenir une facture ?', answer: 'Oui, une facture vous sera automatiquement envoyée par email après votre inscription.' },
  { question: 'Y a-t-il un accompagnement personnalisé ?', answer: 'Oui, vous bénéficiez d\'un suivi personnalisé tout au long de votre formation. Notre équipe est disponible pour répondre à vos questions.' },
  { question: 'Le paiement est-il sécurisé ?', answer: 'Absolument. Tous les paiements sont traités par Revolut avec un cryptage SSL 256 bits. Vos données bancaires sont protégées.' },
]
</script>

<style lang="scss" scoped>
.sale-hero {
  padding: 120px 0 80px;
  background: $gradient-hero;
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
    &--2 { width: 250px; height: 250px; bottom: 5%; left: 10%; opacity: 0.15; }
  }

  &__split {
    align-items: flex-start;
  }

  &__title {
    font-size: $h2;
    color: $text-white;
    margin: 20px 0;
    line-height: 1.15;
  }

  &__desc {
    color: $text-on-dark-muted;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 32px;
    color: $text-on-dark-muted;
    font-size: $small;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__image {
    padding: 0;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border-radius: $radius-lg;
    }
  }
}

.learn {
  background: $bg-dark-2;

  &__item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 14px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.07);
    }
  }

  &__check {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    padding: 6px;
    border-radius: 50%;
    background: rgba($orange, 0.12);
    color: $orange;
  }

  span {
    color: $text-on-dark;
    font-size: $small;
    line-height: 1.6;
  }
}

.trust {
  background: $bg-dark-1;
  padding: $section-pad-sm 0;

  &__signal {
    text-align: center;
  }

  &__icon {
    color: $purple-light;
    margin-bottom: 16px;
  }

  &__title {
    color: $text-white;
    font-size: $h4;
    margin-bottom: 8px;
  }

  &__desc {
    color: $text-on-dark-muted;
    font-size: $small;
    line-height: 1.6;
  }
}

.pricing {
  background: $bg-dark-2;

  &__text {
    color: $text-on-dark-muted;
    line-height: 1.8;
    margin-top: 16px;
  }

  &__packs-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__pack {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    cursor: pointer;
    transition: $transition-base;

    input {
      width: 20px;
      height: 20px;
      accent-color: $orange;
    }

    &--selected {
      border-color: rgba($orange, 0.4);
      box-shadow: $shadow-glow-orange;
    }

    strong {
      color: $text-white;
      font-size: $small;
      display: block;
      margin-bottom: 4px;
    }
  }

  &__pack-save {
    color: $orange;
    font-size: $xs;
    font-weight: 600;
  }
}

.faq-section {
  background: $bg-dark-1;
}
</style>
