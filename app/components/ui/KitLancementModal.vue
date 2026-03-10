<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="kit-overlay" @click.self="$emit('close')">
        <div class="kit-modal glass-card-light">
          <button class="kit-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <template v-if="!submitted">
            <div class="kit-modal__header text-center">
              <GlassBadge variant="orange-light">
                <FileDown :size="14" />
                Kit de lancement
              </GlassBadge>
              <h2 class="kit-modal__title mt-16">
                Avant de partir, prends le <span class="gradient-text">kit de lancement.</span>
              </h2>
              <p class="kit-modal__desc">
                Le guide pratique pour démarrer ton projet d'entreprise du bon pied. Gratuit, immédiat.
              </p>
            </div>

            <form class="kit-modal__form mt-24" @submit.prevent="handleSubmit">
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
              <AppButton variant="primary" block type="submit" :disabled="loading" class="mt-16">
                <Loader2 v-if="loading" :size="18" class="kit-modal__spin" />
                {{ loading ? 'Envoi...' : 'Je reçois mon kit' }}
              </AppButton>
              <p class="kit-modal__privacy">
                Aucun spam. Juste de la valeur.
              </p>
            </form>
          </template>

          <!-- Success state -->
          <div v-else class="kit-modal__success text-center">
            <div class="kit-modal__success-icon">
              <CheckCircle :size="48" />
            </div>
            <h3 class="mt-16">C'est envoyé !</h3>
            <p class="text-muted mt-8">Vérifie ta boîte email pour accéder à ton kit de lancement.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X, FileDown, Loader2, CheckCircle } from 'lucide-vue-next'

defineProps<{
  visible: boolean
}>()

defineEmits(['close'])

const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  firstName: '',
  email: '',
})

const { trackLead } = useFBPixel()
const { trackGenerateLead } = useGoogleAds()

async function handleSubmit() {
  if (!form.firstName || !form.email) {
    const { useToast } = await import('vue-toastification')
    useToast().error('Veuillez remplir tous les champs.')
    return
  }

  loading.value = true

  try {
    await $fetch('/api/kit-lancement', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        email: form.email,
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
  background: rgba(10, 5, 20, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24px) saturate(1.3);
  -webkit-backdrop-filter: blur(24px) saturate(1.3);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.06),
    0 0 20px rgba($purple, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(0, 0, 0, 0.03);

  &:hover {
    transform: none;
  }

  @media (max-width: 640px) {
    padding: 28px 20px;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: $text-muted;
    cursor: pointer;
    padding: 4px;
    transition: color 0.3s ease;

    &:hover {
      color: $text-heading;
    }
  }

  &__title {
    font-family: $font-heading;
    font-size: $h3;
    font-weight: 800;
    line-height: 1.3;
  }

  &__desc {
    color: $text-body;
    font-size: $small;
    line-height: 1.7;
    margin-top: 12px;
  }

  &__privacy {
    font-size: $xs;
    color: $text-body;
    text-align: center;
    margin-top: 12px;
    opacity: 0.7;
  }

  &__spin {
    animation: spin 1s linear infinite;
  }

  &__success-icon {
    color: $orange;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Transition
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s $ease-smooth;

  .kit-modal {
    transition: all 0.3s $ease-smooth;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .kit-modal {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }
}
</style>
