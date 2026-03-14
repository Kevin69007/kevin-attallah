<template>
  <div>
    <!-- Processing overlay -->
    <Teleport to="body">
      <Transition name="overlay-fade">
        <div v-if="isProcessing" class="processing-overlay">
          <div class="processing-overlay__card">
            <Loader2 :size="40" class="processing-overlay__spinner" />
            <h3 class="processing-overlay__title">PAIEMENT EN COURS</h3>
            <p class="processing-overlay__text">Veuillez patienter pendant le traitement de votre paiement...</p>
            <div class="processing-overlay__dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <section class="checkout">
      <div class="container">
        <h1 class="checkout__title">DERNIÈRE ÉTAPE.</h1>
        <p class="checkout__subtitle">PAIEMENT SÉCURISÉ PAR CARTE BANCAIRE</p>

        <!-- Full formation landing (only for creer-entreprise flow) -->
        <template v-if="isCreationFormation">
          <!-- Hero banner -->
          <div class="lp-hero" ref="lpHeroRef">
            <div class="lp-hero__grid">
              <div class="lp-hero__content">
                <span class="lp-label">PROGRAMME_</span>
                <h2 class="lp-hero__title">CRÉER MON <span class="text-purple">ENTREPRISE</span></h2>
                <p class="lp-hero__subtitle">
                  Formation complète pour lancer ton activité de A à Z, avec l'IA comme accélérateur. De l'idée au premier client.
                </p>
                <div class="lp-hero__badges">
                  <span class="lp-badge"><span class="lp-badge__icon">►</span> ACCÈS IMMÉDIAT & À VIE</span>
                  <span class="lp-badge"><span class="lp-badge__icon">►</span> 100% FINANÇABLE</span>
                  <span class="lp-badge"><span class="lp-badge__icon">►</span> FORMATION BONUS OFFERTE</span>
                </div>
              </div>
              <div class="lp-hero__video">
                <video autoplay muted loop playsinline>
                  <source src="/video/home-step-01.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <!-- Modules -->
          <div class="lp-modules" ref="lpModulesRef">
            <h3 class="lp-section-title">CE QUE TU VAS <span class="text-purple">APPRENDRE</span></h3>
            <div class="lp-modules__grid">
              <div
                v-for="(mod, i) in formationModules"
                :key="mod.title"
                :class="['lp-mod', i % 2 === 0 ? 'lp-mod--purple' : 'lp-mod--orange']"
              >
                <span class="lp-mod__num">{{ String(i + 1).padStart(2, '0') }}</span>
                <h4 class="lp-mod__title">{{ mod.title }}</h4>
                <p class="lp-mod__desc">{{ mod.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Trust signals -->
          <div class="lp-trust" ref="lpTrustRef">
            <div class="lp-trust__grid">
              <div class="lp-trust__item lp-trust__item--purple">
                <span class="lp-trust__value">2 100+</span>
                <span class="lp-trust__label">ENTREPRENEURS FORMÉS</span>
              </div>
              <div class="lp-trust__item lp-trust__item--orange">
                <span class="lp-trust__value">98%</span>
                <span class="lp-trust__label">DE SATISFACTION</span>
              </div>
              <div class="lp-trust__item lp-trust__item--purple">
                <span class="lp-trust__value">24/7</span>
                <span class="lp-trust__label">ACCÈS EN LIGNE</span>
              </div>
              <div class="lp-trust__item lp-trust__item--orange">
                <span class="lp-trust__value">299€</span>
                <span class="lp-trust__label">PRIX TOUT COMPRIS</span>
              </div>
            </div>
          </div>

          <!-- Testimonial quote -->
          <div class="lp-quote" ref="lpQuoteRef">
            <div class="lp-quote__grid">
              <div class="lp-quote__left">
                <div class="lp-quote__stars">★★★★★</div>
                <p class="lp-quote__text">"KEVIN M'A AIDÉ À RESTRUCTURER MON AGENCE AUTOUR DE L'IA. ON A TRIPLÉ NOTRE MARGE EN UN TRIMESTRE SANS RECRUTER."</p>
                <span class="lp-quote__author">— SARAH M., FONDATRICE NEOAGENCY</span>
              </div>
              <div class="lp-quote__right">
                <NuxtImg src="/img/avatar/avatar-2.jpg" alt="Sarah M." class="lp-quote__avatar" format="webp" quality="80" />
              </div>
            </div>
          </div>

          <!-- Separator before form -->
          <div class="lp-form-header">
            <h3 class="lp-form-header__title">PASSE À <span class="text-purple">L'ACTION</span></h3>
            <p class="lp-form-header__sub">REMPLIS LE FORMULAIRE CI-DESSOUS POUR FINALISER TON INSCRIPTION.</p>
          </div>
        </template>

        <div class="checkout__grid">
          <!-- Left: Billing form -->
          <div>
            <div class="checkout__card">
              <h3 class="checkout__card-heading">INFORMATIONS DE FACTURATION</h3>
              <form @submit.prevent>
                <FormInput
                  id="name"
                  v-model="form.name"
                  label="Nom complet"
                  placeholder="Jean Dupont"
                  required
                />
                <div class="checkout__row">
                  <FormInput
                    id="email"
                    v-model="form.email"
                    label="E-mail"
                    type="email"
                    placeholder="jean@example.com"
                    required
                  />
                  <FormInput
                    id="phone"
                    v-model="form.phone"
                    label="Téléphone"
                    type="tel"
                    placeholder="+33612345678"
                  />
                </div>
                <div class="checkout__row">
                  <FormInput
                    id="city"
                    v-model="form.city"
                    label="Ville"
                    placeholder="Paris"
                    required
                  />
                  <FormInput
                    id="postcode"
                    v-model="form.postcode"
                    label="Code postal"
                    placeholder="75002"
                    required
                  />
                </div>
              </form>

              <!-- Revolut Card Field -->
              <div class="form-group" style="margin-top: 24px">
                <label class="checkout__label">CARTE BANCAIRE</label>
                <div id="card-field" class="checkout__card-field"></div>
              </div>

              <AppButton
                id="button-submit"
                variant="primary"
                block
                class="mt-24"
                :disabled="isProcessing"
                @click="handlePayment"
              >
                <Loader2 v-if="isProcessing" :size="18" class="btn-spinner" />
                {{ isProcessing ? 'TRAITEMENT...' : `PAYER ${orderAmount}€` }}
              </AppButton>
            </div>
          </div>

          <!-- Right: Order summary -->
          <div>
            <div class="checkout__summary-card">
              <h3 class="checkout__card-heading">RÉCAPITULATIF</h3>
              <div class="checkout__summary">
                <div class="checkout__summary-row">
                  <span>FORMATION</span>
                  <span>{{ orderDescription }}</span>
                </div>
                <div class="checkout__divider"></div>
                <div class="checkout__summary-row checkout__summary-row--total">
                  <span>TOTAL</span>
                  <span class="checkout__total-price">{{ orderAmount }}€</span>
                </div>
              </div>
            </div>

            <!-- Trust signals -->
            <div class="checkout__trust-list">
              <div v-for="signal in trustSignals" :key="signal.title" class="checkout__trust-item">
                <component :is="signal.icon" :size="20" class="checkout__trust-icon" />
                <div>
                  <strong>{{ signal.title }}</strong>
                  <p>{{ signal.description }}</p>
                </div>
              </div>
            </div>

            <div class="checkout__visa">
              <img src="/img/visamastercard.png" alt="Visa MasterCard" style="max-width: 200px; margin: 0 auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Shield, Lock, CreditCard, Loader2 } from 'lucide-vue-next'
import RevolutCheckout from '@revolut/checkout'

useHead({ title: 'Paiement' })

const router = useRouter()
const { trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } = useFBPixel()
const { trackBeginCheckout, trackAddPaymentInfo: gTrackAddPaymentInfo, trackPurchase: gTrackPurchase } = useGoogleAds()
const { trackConversion } = useLinkedIn()
const { revolutSandbox } = useRuntimeConfig().public

const lpHeroRef = ref<HTMLElement | null>(null)
const lpModulesRef = ref<HTMLElement | null>(null)
const lpTrustRef = ref<HTMLElement | null>(null)
const lpQuoteRef = ref<HTMLElement | null>(null)

const orderToken = ref('')
const orderAmount = ref(0)
const orderDescription = ref('')
const isCreationFormation = computed(() =>
  orderDescription.value?.includes('Créer mon entreprise')
)
const buyerCountryCode = ref('FR')
const isProcessing = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  postcode: '',
})

onMounted(() => {
  const stored = localStorage.getItem('orderResponse')
  if (!stored) {
    router.replace('/')
    return
  }

  const parsed = JSON.parse(stored)
  orderToken.value = parsed?.token || ''
  // Revolut API returns amount in order_amount.value (cents)
  orderAmount.value = (parsed?.order_amount?.value ?? parsed?.amount ?? 0) / 100
  orderDescription.value = parsed?.description || ''

  if (!orderToken.value || !orderAmount.value) {
    router.replace('/')
    return
  }

  trackInitiateCheckout({
    content_name: parsed?.description,
    value: orderAmount.value,
    currency: 'EUR',
  })
  trackBeginCheckout({
    items: [{ item_name: parsed?.description }],
    value: orderAmount.value,
    currency: 'EUR',
  })

  initRevolutCard(parsed?.token)

  // Pre-fill form from hero form data
  const buyerInfo = localStorage.getItem('buyerInfo')
  if (buyerInfo) {
    const buyer = JSON.parse(buyerInfo)
    form.name = buyer.name || ''
    form.email = buyer.email || ''
    form.phone = buyer.phone || ''
    form.city = buyer.city || ''
    form.postcode = buyer.postcode || ''
    buyerCountryCode.value = buyer.countryCode || 'FR'
  }

  // GSAP animations for landing page sections
  if (isCreationFormation.value) {
    const { $gsap } = useNuxtApp()
    if ($gsap) {
      const gsap = $gsap as any

      // Hero entrance
      if (lpHeroRef.value) {
        gsap.from(lpHeroRef.value, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2
        })
      }

      // Modules stagger
      if (lpModulesRef.value) {
        gsap.from(lpModulesRef.value.querySelectorAll('.lp-mod'), {
          y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: lpModulesRef.value, start: 'top 80%' }
        })
      }

      // Trust counter animation
      if (lpTrustRef.value) {
        gsap.from(lpTrustRef.value.querySelectorAll('.lp-trust__item'), {
          scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: lpTrustRef.value, start: 'top 80%' }
        })
      }

      // Quote slide in from right + shadow pulse
      if (lpQuoteRef.value) {
        gsap.from(lpQuoteRef.value, {
          x: 60, opacity: 0, rotationZ: 2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: lpQuoteRef.value, start: 'top 85%' }
        })
        gsap.from(lpQuoteRef.value.querySelector('.lp-quote__avatar'), {
          scale: 1.2, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: lpQuoteRef.value, start: 'top 85%' }
        })
      }

    }
  }
})

let cardField: any = null

function initRevolutCard(token: string) {
  if (!token || typeof window === 'undefined') return

  RevolutCheckout(token, revolutSandbox ? 'sandbox' : 'prod')
    .then((instance: any) => {
      cardField = instance.createCardField({
        target: document.getElementById('card-field'),
        onSuccess: onPaymentSuccess,
        onError: onPaymentError,
        onCancel: () => {
          isProcessing.value = false
        },
        styles: {
          default: {
            color: '#111827',
            fontSize: '16px',
            '::placeholder': { color: '#9CA3AF' },
          },
        },
      })
    })
    .catch((err: any) => {
      console.error('RevolutCheckout init error:', err)
      showToast('Impossible de charger le formulaire de paiement.', 'error')
    })
}

function getFormData() {
  if (!form.name) {
    showToast('Nom est obligatoire.', 'error')
    return null
  }
  if (!form.email) {
    showToast('Email est obligatoire.', 'error')
    return null
  }

  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    cardholderName: form.name,
    mount: orderAmount.value * 100,
    formation: orderDescription.value,
    billingAddress: {
      countryCode: buyerCountryCode.value,
      city: form.city,
      postcode: form.postcode,
    },
  }
}

async function handlePayment() {
  const data = getFormData()
  if (!data) return
  if (!cardField) {
    showToast('Le formulaire de paiement n\'est pas prêt.', 'error')
    return
  }

  isProcessing.value = true

  // Safety timeout: reset overlay if no callback fires within 60s
  setTimeout(() => {
    if (isProcessing.value) {
      isProcessing.value = false
      showToast('Le paiement n\'a pas pu être traité. Veuillez réessayer.', 'error')
    }
  }, 60000)

  trackAddPaymentInfo()
  gTrackAddPaymentInfo()

  try {
    await cardField.submit({
      name: data.cardholderName,
      email: data.email,
      billingAddress: data.billingAddress,
    })
  } catch (err: any) {
    isProcessing.value = false
    console.error('Card submit error:', err)
    showToast(err?.message || 'Erreur lors du paiement. Veuillez réessayer.', 'error')
  }
}

async function onPaymentSuccess() {
  console.log('onPaymentSuccess triggered')
  const data = getFormData()
  if (!data) {
    console.error('getFormData returned null in onPaymentSuccess')
    isProcessing.value = false
    localStorage.setItem('paymentSuccess', 'true')
    router.push('/remerciement')
    return
  }

  trackPurchase({
    content_name: orderDescription.value,
    value: orderAmount.value,
    currency: 'EUR',
  })
  gTrackPurchase({
    transaction_id: orderToken.value,
    items: [{ item_name: orderDescription.value }],
    value: orderAmount.value,
    currency: 'EUR',
  })
  trackConversion()

  try {
    await Promise.all([
      $fetch('/api/payment-received', { method: 'POST', body: data }),
      $fetch('/api/send-data-to-brevo', { method: 'POST', body: data }),
    ])
  } catch (err) {
    console.error('Post-payment error:', err)
  }

  localStorage.removeItem('orderResponse')
  localStorage.removeItem('buyerInfo')
  isProcessing.value = false
  localStorage.setItem('paymentSuccess', 'true')
  router.push('/remerciement')
}

function onPaymentError(error: any) {
  isProcessing.value = false
  console.error('Payment error:', error)
  showToast('Erreur de paiement. Veuillez réessayer.', 'error')
}

async function showToast(msg: string, type: 'error' | 'success' = 'error') {
  const { useToast } = await import('vue-toastification')
  const toast = useToast()
  if (type === 'error') toast.error(msg)
  else toast.success(msg)
}

const formationModules = [
  { title: 'TROUVER & VALIDER TON IDÉE', desc: 'Une idée solide, validée par la data.' },
  { title: 'VALIDER LE MARCHÉ', desc: 'Analyse marché, cible et concurrence.' },
  { title: 'CHOISIR LA STRUCTURE', desc: 'Micro, SASU, SARL — on tranche vite.' },
  { title: 'BUSINESS PLAN', desc: 'Un plan chiffré qui convainc.' },
  { title: 'MARKETING & ACQUISITION', desc: 'Tes premiers clients rapidement.' },
  { title: 'L\'IA COMME COPILOTE', desc: 'Automatise et gagne du temps.' },
  { title: 'FORMATION BONUS', desc: 'Une formation offerte en plus.' },
  { title: 'CHECKLIST LANCEMENT', desc: 'Liste complète pour ne rien oublier le jour J.' },
]

const trustSignals = [
  { icon: Shield, title: 'SÉCURISÉ SSL', description: 'Cryptage 256 bits' },
  { icon: Lock, title: 'DONNÉES PROTÉGÉES', description: 'RGPD conforme' },
  { icon: CreditCard, title: 'REVOLUT CHECKOUT', description: 'Paiement sécurisé' },
]
</script>

<style lang="scss" scoped>
.checkout {
  padding: 160px 0 80px;
  min-height: 100vh;
  background: #fff;

  &__title {
    font-family: $font-heading;
    font-size: $h2;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.04em;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $small;
    color: #000;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.08em;
    margin-bottom: 48px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: flex-start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    background: #fff;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
    padding: 32px;
  }

  &__card-heading {
    font-family: $font-heading;
    font-size: 1.25rem;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 4px solid #000;
  }

  &__label {
    font-family: $font-mono;
    font-size: $small;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: 8px;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__card-field {
    min-height: 50px;
    background: #fff;
    border: 4px solid #000;
    padding: 14px 18px;
  }

  &__summary-card {
    background: #fff;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $orange;
    padding: 32px;
    margin-bottom: 24px;
  }

  &__summary {
    &-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: $font-mono;
      font-size: $small;
      color: #000;
      text-transform: uppercase;

      &--total {
        padding-top: 16px;
      }
    }
  }

  &__total-price {
    font-family: $font-heading;
    font-size: 1.75rem;
    font-weight: 900;
    color: $purple;
  }

  &__divider {
    border: none;
    border-top: 4px solid #000;
    margin: 16px 0;
  }

  &__trust-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__trust-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #fff;
    border: 4px solid #000;

    strong {
      font-family: $font-mono;
      font-size: $small;
      color: #000;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
      letter-spacing: 0.04em;
    }

    p {
      font-family: $font-mono;
      font-size: $xs;
      color: #000;
      margin: 0;
      text-transform: uppercase;
    }
  }

  &__trust-icon {
    color: $purple;
    flex-shrink: 0;
  }

  &__visa {
    margin-top: 24px;
    text-align: center;
    padding: 16px;
    border: 4px solid #000;
    background: #fff;
  }
}

.btn-spinner {
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.processing-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);

  &__card {
    text-align: center;
    padding: 48px 40px;
    max-width: 380px;
    width: 90%;
    background: #fff;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
  }

  &__spinner {
    color: $orange;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
  }

  &__title {
    font-family: $font-heading;
    font-size: 1.25rem;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 8px;
    letter-spacing: 0.04em;
  }

  &__text {
    font-family: $font-mono;
    font-size: 0.875rem;
    color: #000;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: 6px;

    span {
      width: 8px;
      height: 8px;
      background: $orange;
      animation: dot-pulse 1.4s ease-in-out infinite;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes dot-pulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

// ── Formation Landing Page sections ──
.text-purple { color: $purple; }
.text-orange { color: $orange; }

.lp-label {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 700;
  color: #FFF;
  text-transform: uppercase;
  background: $purple;
  padding: 4px 10px;
  border: 2px solid #000;
  display: inline-block;
}

.lp-section-title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #000;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.lp-hero {
  border: 4px solid #000;
  box-shadow: 12px 12px 0px $purple;
  background: #FFF;
  margin-bottom: 32px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 16px 16px 0px $purple;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    line-height: 0.95;
    margin: 10px 0 16px;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: 0.9rem;
    color: #000;
    line-height: 1.6;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  &__badges {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__video {
    border-left: 4px solid #000;
    min-height: 300px;

    @media (max-width: 768px) {
      border-left: none;
      border-top: 4px solid #000;
      min-height: 200px;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

.lp-badge {
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  padding: 8px 14px;
  background: #FAFAFA;
  border: 2px solid #000;
  transition: all 0.2s;

  &__icon {
    color: $purple;
    margin-right: 4px;
  }

  &:hover {
    background: $purple;
    color: #FFF;
    border-color: $purple;

    .lp-badge__icon { color: #FFF; }
  }
}

.lp-modules {
  border: 4px solid #000;
  background: #FAFAFA;
  padding: 40px;
  margin-bottom: 32px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 4px solid #000;
    background: #000;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
}

.lp-mod {
  background: #FFF;
  padding: 24px 20px;
  border-right: 4px solid #000;
  transition: background 0.2s, color 0.2s;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 900px) {
    &:nth-child(even) {
      border-right: none;
    }

    &:nth-child(n+3) {
      border-top: 4px solid #000;
    }
  }

  @media (max-width: 500px) {
    border-right: none;

    & + & {
      border-top: 4px solid #000;
    }
  }

  &--purple {
    border-top: 4px solid $purple;

    .lp-mod__num { color: rgba($purple, 0.2); }

    &:hover {
      background: $purple;
      .lp-mod__title { color: #FFF; }
      .lp-mod__desc { color: rgba(255, 255, 255, 0.7); }
      .lp-mod__num { color: rgba(255, 255, 255, 0.2); }
    }
  }

  &--orange {
    border-top: 4px solid $orange;

    .lp-mod__num { color: rgba($orange, 0.2); }

    &:hover {
      background: $orange;
      .lp-mod__title { color: #FFF; }
      .lp-mod__desc { color: rgba(255, 255, 255, 0.7); }
      .lp-mod__num { color: rgba(255, 255, 255, 0.2); }
    }
  }

  &__num {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
    display: block;
    margin-bottom: 8px;
    transition: color 0.2s;
  }

  &__title {
    font-size: 0.85rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 6px;
    transition: color 0.2s;
  }

  &__desc {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.4;
    transition: color 0.2s;
  }
}

.lp-trust {
  margin-bottom: 32px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 4px solid #000;
    background: #000;

    @media (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    background: #FFF;
    padding: 28px 20px;
    text-align: center;
    border-right: 4px solid #000;
    transition: transform 0.2s, box-shadow 0.2s;

    &:last-child {
      border-right: none;
    }

    &--purple {
      .lp-trust__value { color: $purple; }

      &:hover {
        background: $purple;
        .lp-trust__value { color: #FFF; }
        .lp-trust__label { color: rgba(255, 255, 255, 0.8); }
      }
    }

    &--orange {
      .lp-trust__value { color: $orange; }

      &:hover {
        background: $orange;
        .lp-trust__value { color: #FFF; }
        .lp-trust__label { color: rgba(255, 255, 255, 0.8); }
      }
    }

    @media (max-width: 640px) {
      &:nth-child(even) {
        border-right: none;
      }

      &:nth-child(n+3) {
        border-top: 4px solid #000;
      }
    }
  }

  &__value {
    font-family: $font-heading;
    font-size: 1.75rem;
    font-weight: 900;
    display: block;
    margin-bottom: 4px;
    transition: color 0.2s;
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 700;
    color: #000;
    transition: color 0.2s;
  }
}

.lp-quote {
  border: 4px solid #000;
  background: #FFF;
  margin-bottom: 32px;
  box-shadow: 8px 8px 0px $purple;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: quote-glow 4s ease-in-out infinite;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 14px 14px 0px $orange;
    animation: none;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr auto;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__left {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 4px solid #000;

    @media (max-width: 640px) {
      border-right: none;
      border-bottom: 4px solid #000;
    }
  }

  &__stars {
    font-size: 1.25rem;
    color: $orange;
    letter-spacing: 4px;
    margin-bottom: 16px;
  }

  &__text {
    font-family: $font-heading;
    font-size: clamp(1rem, 2vw, 1.35rem);
    font-weight: 700;
    line-height: 1.5;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 16px;
  }

  &__author {
    font-family: $font-mono;
    font-size: 0.8rem;
    font-weight: 700;
    color: $purple;
  }

  &__right {
    width: 200px;
    background: $purple;

    @media (max-width: 640px) {
      width: 100%;
      height: 200px;
    }
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(30%);
    mix-blend-mode: luminosity;
    transition: filter 0.3s;
  }

  &:hover &__avatar {
    filter: grayscale(0%);
    mix-blend-mode: normal;
  }
}

@keyframes quote-glow {
  0%, 100% { box-shadow: 8px 8px 0px $purple; }
  50% { box-shadow: 10px 10px 0px $orange; }
}

.lp-form-header {
  text-align: center;
  padding: 40px 0 32px;
  border-top: 4px solid #000;
  margin-bottom: 8px;

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    line-height: 0.95;
    margin-bottom: 12px;
  }

  &__sub {
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
  }
}
</style>
