<template>
  <div v-if="formation">
    <!-- Hero -->
    <section class="sale-hero">
      <div class="container">
        <div class="sale-hero__split">
          <div class="sale-hero__content">
            <div class="sale-hero__badge">
              <Award :size="14" /> 100% FINANÇABLE
            </div>
            <h1 class="sale-hero__title">{{ formation.titre }}</h1>
            <p class="sale-hero__desc">{{ formation.description }}</p>
            <div class="sale-hero__meta">
              <span><Clock :size="16" /> {{ duree }}H ENVIRON</span>
              <span><BarChart3 :size="16" /> {{ formation.niveau }}</span>
              <span><Users :size="16" /> {{ formation.public }}</span>
            </div>
            <div class="btn-group">
              <AppButton variant="primary" size="lg" @click="scrollToPrice">
                S'inscrire maintenant
                <ArrowRight :size="20" />
              </AppButton>
            </div>
          </div>
          <div class="sale-hero__image">
            <img :src="formation.image" :alt="formation.titre" />
          </div>
        </div>
      </div>
    </section>

    <!-- What you'll learn -->
    <section class="learn">
      <div class="container">
        <span class="section-label">OBJECTIFS_</span>
        <h2 class="section-title">OBJECTIFS PÉDAGOGIQUES</h2>
        <div class="learn__grid">
          <div
            v-for="(obj, i) in formation.objectifs_pedagogiques"
            :key="i"
            class="learn__item"
          >
            <CheckCircle :size="20" class="learn__check" />
            <span>{{ obj }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust signals -->
    <section class="trust">
      <div class="container">
        <div class="trust__grid">
          <div v-for="signal in trustSignals" :key="signal.title" class="trust__card">
            <div class="trust__signal">
              <component :is="signal.icon" :size="32" class="trust__icon" />
              <h4 class="trust__title">{{ signal.title }}</h4>
              <p class="trust__desc">{{ signal.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="pricing">
      <div class="container">
        <div class="pricing__split">
          <div>
            <span class="section-label">TARIF_</span>
            <h2 class="section-title">INVESTIS DANS TON AVENIR</h2>
            <p class="pricing__text">
              Formation certifiante 100% finançable. Paiement sécurisé par carte bancaire.
              Accès immédiat dès l'inscription.
            </p>

            <!-- Pack selector for anglais/compta -->
            <div v-if="showPacks" class="pricing__packs mt-32">
              <h3 class="pricing__packs-heading">PACKS EXCLUSIFS_</h3>
              <p class="pricing__packs-sub">
                Économisez en combinant plusieurs formations
              </p>
              <div class="pricing__packs-list">
                <label
                  v-for="pack in availablePacks"
                  :key="pack.id"
                  :class="['pricing__pack', { 'pricing__pack--selected': selectedPacks[pack.id] }]"
                >
                  <input
                    type="checkbox"
                    :checked="selectedPacks[pack.id]"
                    @change="handlePackChange(pack.id, pack.title)"
                  />
                  <div>
                    <strong>{{ pack.title }}</strong>
                    <span class="pricing__pack-save">ÉCONOMISEZ {{ pack.savings }}€</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <PriceCard
            :normalPrice="normalAmount"
            :promoPrice="!isExpired ? promoAmount : (hasPackDiscount ? remise : undefined)"
            :badge="!isExpired ? `-${percentage}% OFFRE LIMITÉE` : (hasPackDiscount ? `-${remisep}%` : undefined)"
            :showTimer="!isExpired"
            :ctaText="isLoading ? 'Chargement...' : 'S\'inscrire maintenant'"
            @purchase="createOrder"
          />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container container--narrow">
        <span class="section-label text-center">FAQ_</span>
        <h2 class="section-title text-center">QUESTIONS FRÉQUENTES</h2>
        <div class="mt-32">
          <FAQAccordion :items="faqItems" />
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <CTABrutalist
      titleLine1="PRÊT À TE"
      titleLine2="LANCER ?"
      subtitle="Rejoins les 2100+ entrepreneurs qui ont transformé leur carrière."
      buttonText="S'INSCRIRE"
      buttonTo="/formations"
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
  <div v-else style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fff;">
    <div class="text-center">
      <h1 style="font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; border-bottom: 4px solid #000; display: inline-block; padding-bottom: 8px;">FORMATION INTROUVABLE</h1>
      <p style="color: #000; margin-top: 16px; font-family: 'Space Mono', monospace;">Cette formation n'existe pas dans notre catalogue.</p>
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
const { trackViewItem, trackAddToCart: gTrackAddToCart } = useGoogleAds()

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

// Resolve product ID for server-side price lookup
function getSelectedProductId(): string {
  if (selectedPacks.value['anglais-debutant + intermediaire']) {
    return 'pack-anglais-debutant-intermediaire'
  }
  if (selectedPacks.value['anglais-intermediaire + Avancé']) {
    return 'pack-anglais-intermediaire-avance'
  }
  if (selectedPacks.value['anglais-debutant, intermediaire + Avancé']) {
    return 'pack-anglais-complet'
  }
  if (selectedPacks.value['compta-initiation + Les Fondamentaux']) {
    return 'pack-compta-initiation-fondamentaux'
  }
  return formation.value!.id
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
  gTrackAddToCart({
    items: [{ item_name: formation.value.titre, item_id: formation.value.id, price: finalAmount }],
    value: finalAmount,
    currency: 'EUR',
  })

  isLoading.value = true

  try {
    const data = await $fetch('/api/create-order', {
      method: 'POST',
      body: {
        productId: getSelectedProductId(),
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
    trackViewItem({
      items: [{ item_name: formation.value.titre, item_id: formation.value.id, price: promoAmount.value }],
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
/* ============================================
   BRUTALIST DESIGN — formations/[id].vue
   ============================================ */

.section-label {
  font-family: $font-mono;
  font-size: $xs;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: $purple;
  font-weight: 700;
  display: block;
  margin-bottom: 12px;
}

.section-title {
  font-family: $font-heading;
  font-size: $h3;
  text-transform: uppercase;
  color: #000;
  line-height: 1.1;
  margin-bottom: 24px;
}

/* ---------- HERO ---------- */
.sale-hero {
  padding: 120px 0 80px;
  background: #fff;
  position: relative;

  &__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 4px solid #000;
    background: $orange;
    color: #fff;
    font-family: $font-mono;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    box-shadow: 4px 4px 0px #000;
    margin-bottom: 24px;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    color: #000;
    text-transform: uppercase;
    line-height: 1.05;
    margin: 0 0 20px;
  }

  &__desc {
    font-family: $font-mono;
    color: #000;
    line-height: 1.8;
    margin-bottom: 24px;
    font-size: $small;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 32px;
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    text-transform: uppercase;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border: 2px solid #000;
      background: #fff;
    }
  }

  &__image {
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
    }
  }
}

/* ---------- LEARN / OBJECTIFS ---------- */
.learn {
  padding: $section-pad 0;
  background: $bg-section-alt;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 32px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border: 4px solid #000;
    background: #fff;
    box-shadow: 4px 4px 0px $purple;
    transition: transform 0.15s ease;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px $purple;
    }
  }

  &__check {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    padding: 6px;
    background: $purple;
    color: #fff;
  }

  span {
    font-family: $font-mono;
    color: #000;
    font-size: $small;
    line-height: 1.6;
  }
}

/* ---------- TRUST SIGNALS ---------- */
.trust {
  padding: $section-pad-sm 0;
  background: #fff;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    border: 4px solid #000;
    background: #fff;
    padding: 32px 24px;
    box-shadow: 8px 8px 0px $orange;
    transition: transform 0.15s ease;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 10px 10px 0px $orange;
    }
  }

  &__signal {
    text-align: center;
  }

  &__icon {
    color: $purple;
    margin-bottom: 16px;
  }

  &__title {
    font-family: $font-heading;
    color: #000;
    font-size: $h4;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  &__desc {
    font-family: $font-mono;
    color: #000;
    font-size: $xs;
    line-height: 1.6;
  }
}

/* ---------- PRICING ---------- */
.pricing {
  padding: $section-pad 0;
  background: $bg-section-alt;

  &__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  &__text {
    font-family: $font-mono;
    color: #000;
    line-height: 1.8;
    margin-top: 16px;
    font-size: $small;
  }

  &__packs-heading {
    font-family: $font-heading;
    font-size: $h4;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 8px;
  }

  &__packs-sub {
    font-family: $font-mono;
    font-size: $xs;
    color: #000;
    margin-bottom: 24px;
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
    border: 4px solid #000;
    background: #fff;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    input {
      width: 20px;
      height: 20px;
      accent-color: $purple;
    }

    &--selected {
      box-shadow: 6px 6px 0px $purple;
      transform: translate(-2px, -2px);
    }

    strong {
      font-family: $font-heading;
      color: #000;
      font-size: $small;
      text-transform: uppercase;
      display: block;
      margin-bottom: 4px;
    }
  }

  &__pack-save {
    font-family: $font-mono;
    color: $purple;
    font-size: $xs;
    font-weight: 700;
    text-transform: uppercase;
  }
}

/* ---------- FAQ ---------- */
.faq-section {
  padding: $section-pad 0;
  background: #fff;
}

</style>
