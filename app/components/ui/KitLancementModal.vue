<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="kit-overlay" @click.self="$emit('close')">
        <div class="kit-modal">
          <button class="kit-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <template v-if="!submitted">
            <div class="kit-modal__header text-center">
              <span class="kit-modal__badge">KIT_LANCEMENT_</span>
              <h2 class="kit-modal__title">
                🎁 AVANT DE PARTIR, PRENDS LE <span class="text-purple">KIT DE LANCEMENT.</span>
              </h2>
              <p class="kit-modal__desc">
                🚀 LE GUIDE PRATIQUE POUR DÉMARRER TON PROJET D'ENTREPRISE DU BON PIED. GRATUIT, IMMÉDIAT.
              </p>
            </div>

            <form class="kit-modal__form" @submit.prevent="handleSubmit">
              <FormInput
                id="kit-lastName"
                v-model="form.lastName"
                label="Nom"
                placeholder="Dupont"
                required
              />
              <FormInput
                id="kit-firstName"
                v-model="form.firstName"
                label="Prénom"
                placeholder="Jean"
                required
              />
              <FormInput
                id="kit-email"
                v-model="form.email"
                label="Email"
                type="email"
                placeholder="jean@example.com"
                required
              />
              <FormInput
                id="kit-phone"
                v-model="form.phone"
                label="Téléphone"
                type="tel"
                placeholder="06 12 34 56 78"
                required
              />
              <AppButton variant="primary" block type="submit" :disabled="loading" class="mt-16">
                <Loader2 v-if="loading" :size="18" class="kit-modal__spin" />
                {{ loading ? 'ENVOI...' : 'JE REÇOIS MON KIT' }}
              </AppButton>
              <p class="kit-modal__privacy">
                🔒 AUCUN SPAM. JUSTE DE LA VALEUR.
              </p>
            </form>
          </template>

          <!-- Success state -->
          <div v-else class="kit-modal__success text-center">
            <div class="kit-modal__success-icon">
              <CheckCircle :size="48" />
            </div>
            <h3>C'EST ENVOYÉ !</h3>
            <p>VÉRIFIE TA BOÎTE EMAIL POUR ACCÉDER À TON KIT DE LANCEMENT.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X, Loader2, CheckCircle } from 'lucide-vue-next'

defineProps<{
  visible: boolean
}>()

defineEmits(['close'])

const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
})

const { trackLead } = useFBPixel()
const { trackGenerateLead } = useGoogleAds()

async function handleSubmit() {
  if (!form.lastName || !form.firstName || !form.email || !form.phone) {
    const { useToast } = await import('vue-toastification')
    useToast().error('Veuillez remplir tous les champs.')
    return
  }

  loading.value = true

  try {
    await $fetch('/api/kit-lancement', {
      method: 'POST',
      body: {
        lastName: form.lastName,
        firstName: form.firstName,
        email: form.email,
        phone: form.phone,
      },
    })

    trackLead()
    trackGenerateLead()
    localStorage.setItem('kit_submitted', 'true')
    submitted.value = true
  } catch {
    const { useToast } = await import('vue-toastification')
    useToast().error('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.kit-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.kit-modal {
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  background: #FFF;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px $orange;

  @media (max-width: 640px) {
    padding: 28px 20px;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #000;
    border: 2px solid #000;
    color: #FFF;
    cursor: pointer;
    padding: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: $purple;
    }
  }

  &__badge {
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    color: $orange;
    text-transform: uppercase;
  }

  &__title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.1;
    color: #000;
    margin-top: 12px;

    .text-purple { color: $purple; }
  }

  &__desc {
    font-family: $font-mono;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-top: 12px;
    color: #000;
  }

  &__form {
    margin-top: 24px;
  }

  &__privacy {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: 12px;
  }

  &__spin {
    animation: spin 1s linear infinite;
  }

  &__success {
    padding: 20px 0;

    h3 {
      font-size: 1.5rem;
      text-transform: uppercase;
      color: #000;
      margin-top: 16px;
    }

    p {
      font-family: $font-mono;
      font-size: 0.9rem;
      color: #000;
      margin-top: 8px;
    }
  }

  &__success-icon {
    color: $orange;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .kit-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .kit-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
