<template>
  <div class="page-paiement">
    <WebGLBrutalistLight />
    <main class="brutal-content-stack">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGLBrutalistLight from '~/components/animation/WebGLBrutalistLight.vue'
import { Shield, Lock, CreditCard, Loader2 } from 'lucide-vue-next'
import RevolutCheckout from '@revolut/checkout'

useHead({ title: 'Paiement' })

const router = useRouter()
const { trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } = useFBPixel()
const { trackBeginCheckout, trackAddPaymentInfo: gTrackAddPaymentInfo, trackPurchase: gTrackPurchase } = useGoogleAds()
const { trackConversion } = useLinkedIn()
const { revolutSandbox } = useRuntimeConfig().public

const orderToken = ref('')
const orderAmount = ref(0)
const orderDescription = ref('')
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

const trustSignals = [
  { icon: Shield, title: 'SÉCURISÉ SSL', description: 'Cryptage 256 bits' },
  { icon: Lock, title: 'DONNÉES PROTÉGÉES', description: 'RGPD conforme' },
  { icon: CreditCard, title: 'REVOLUT CHECKOUT', description: 'Paiement sécurisé' },
]
</script>

<style lang="scss" scoped>
.page-paiement {
  position: relative;
  background: #FFF;
}

.brutal-content-stack {
  position: relative;
  z-index: 10;
}

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

@media (max-width: 640px) {
  .checkout {
    padding: 120px 0 40px;
  }

  .checkout__card {
    padding: 20px;
  }

  .checkout__summary {
    padding: 20px;
  }

  .processing-overlay__card {
    padding: 32px 24px;
  }
}

</style>
