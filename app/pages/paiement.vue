<template>
  <div>
    <!-- Processing overlay -->
    <Teleport to="body">
      <Transition name="overlay-fade">
        <div v-if="isProcessing" class="processing-overlay">
          <div class="processing-overlay__card">
            <Loader2 :size="40" class="processing-overlay__spinner" />
            <h3 class="processing-overlay__title">Paiement en cours</h3>
            <p class="processing-overlay__text">Veuillez patienter pendant le traitement de votre paiement...</p>
            <div class="processing-overlay__dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <section class="checkout section--dark">
      <div class="container">
        <ScrollReveal>
          <h1 class="checkout__title text-center text-white">Finaliser votre inscription</h1>
          <p class="checkout__subtitle text-center">Paiement sécurisé par carte bancaire</p>
        </ScrollReveal>

        <div class="checkout__grid split mt-48">
          <!-- Left: Billing form -->
          <div>
            <ScrollReveal>
              <GlassCard variant="dark">
                <h3 class="text-white mb-24">Informations de facturation</h3>
                <form @submit.prevent>
                  <FormInput
                    id="name"
                    v-model="form.name"
                    label="Nom complet"
                    placeholder="Jean Dupont"
                    required
                    dark
                  />
                  <div class="checkout__row">
                    <FormInput
                      id="email"
                      v-model="form.email"
                      label="E-mail"
                      type="email"
                      placeholder="jean@example.com"
                      required
                      dark
                    />
                    <FormInput
                      id="phone"
                      v-model="form.phone"
                      label="Téléphone"
                      type="tel"
                      placeholder="+33612345678"
                      dark
                    />
                  </div>
                  <div class="checkout__row">
                    <FormInput
                      id="city"
                      v-model="form.city"
                      label="Ville"
                      placeholder="Paris"
                      required
                      dark
                    />
                    <FormInput
                      id="postcode"
                      v-model="form.postcode"
                      label="Code postal"
                      placeholder="75002"
                      required
                      dark
                    />
                  </div>
                </form>

                <!-- Revolut Card Field -->
                <div class="form-group form-group--dark mt-24">
                  <label class="form-label">Carte bancaire</label>
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
                  {{ isProcessing ? 'Traitement...' : `Payer ${orderAmount}€` }}
                </AppButton>
              </GlassCard>
            </ScrollReveal>
          </div>

          <!-- Right: Order summary -->
          <div>
            <ScrollReveal direction="right" :delay="0.2">
              <GlassCard variant="dark" class="mb-24">
                <h3 class="text-white mb-16">Récapitulatif</h3>
                <div class="checkout__summary">
                  <div class="checkout__summary-row">
                    <span>Formation</span>
                    <span class="text-white">{{ orderDescription }}</span>
                  </div>
                  <div class="glass-divider" style="margin: 16px 0"></div>
                  <div class="checkout__summary-row checkout__summary-row--total">
                    <span>Total</span>
                    <span class="gradient-text">{{ orderAmount }}€</span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <!-- Trust signals -->
            <ScrollReveal direction="right" :delay="0.4">
              <div class="checkout__trust-list">
                <div v-for="signal in trustSignals" :key="signal.title" class="checkout__trust-item glass-card">
                  <component :is="signal.icon" :size="20" class="checkout__trust-icon" />
                  <div>
                    <strong>{{ signal.title }}</strong>
                    <p>{{ signal.description }}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" :delay="0.6">
              <div class="checkout__visa mt-24 text-center">
                <img src="/img/visamastercard.png" alt="Visa MasterCard" style="max-width: 200px; margin: 0 auto" />
              </div>
            </ScrollReveal>
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
            color: 'white',
            fontSize: '16px',
            '::placeholder': { color: 'rgba(255,255,255,0.4)' },
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

function handlePayment() {
  const data = getFormData()
  if (!data) return
  if (!cardField) {
    showToast('Le formulaire de paiement n\'est pas prêt.', 'error')
    return
  }

  isProcessing.value = true

  trackAddPaymentInfo()
  gTrackAddPaymentInfo()

  cardField.submit({
    name: data.cardholderName,
    email: data.email,
    billingAddress: data.billingAddress,
  })
}

async function onPaymentSuccess() {
  console.log('onPaymentSuccess triggered')
  const data = getFormData()
  if (!data) {
    console.error('getFormData returned null in onPaymentSuccess')
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
  { icon: Shield, title: 'Sécurisé SSL', description: 'Cryptage 256 bits' },
  { icon: Lock, title: 'Données protégées', description: 'RGPD conforme' },
  { icon: CreditCard, title: 'Revolut Checkout', description: 'Paiement sécurisé' },
]
</script>

<style lang="scss" scoped>
.checkout {
  padding: 120px 0 80px;
  background: $gradient-hero;
  min-height: 100vh;

  &__title {
    font-size: $h2;
  }

  &__subtitle {
    color: $text-on-dark-muted;
    font-size: $body-lg;
  }

  &__grid {
    align-items: flex-start;
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
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $radius-sm;
    padding: 14px 18px;
  }

  &__summary {
    &-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $text-on-dark-muted;
      font-size: $small;

      &--total {
        span:last-child {
          font-family: $font-heading;
          font-size: 1.5rem;
          font-weight: 800;
        }
      }
    }
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

    strong {
      color: $text-white;
      font-size: $small;
      display: block;
      margin-bottom: 2px;
    }

    p {
      color: $text-on-dark-muted;
      font-size: $xs;
      margin: 0;
    }
  }

  &__trust-icon {
    color: $purple-light;
    flex-shrink: 0;
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
  background: rgba(10, 5, 20, 0.85);
  backdrop-filter: blur(8px);

  &__card {
    text-align: center;
    padding: 48px 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 380px;
    width: 90%;
  }

  &__spinner {
    color: $orange;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
  }

  &__title {
    color: $text-white;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__text {
    color: $text-on-dark-muted;
    font-size: 0.875rem;
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
      border-radius: 50%;
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
</style>
