<template>
  <form class="free-form" @submit.prevent="handleSubmit">
    <!-- Form state -->
    <template v-if="!submitted">
      <div class="free-form__row">
        <FormInput
          id="ffm-lastName"
          v-model="form.lastName"
          label="Nom"
          placeholder="Dupont"
          required
          dark
        />
        <FormInput
          id="ffm-firstName"
          v-model="form.firstName"
          label="Prénom"
          placeholder="Jean"
          required
          dark
        />
      </div>
      <FormInput
        id="ffm-email"
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="jean@example.com"
        required
        dark
      />
      <FormInput
        id="ffm-phone"
        v-model="form.phone"
        label="Téléphone"
        type="tel"
        placeholder="+33 6 12 34 56 78"
        required
        dark
      />
      <AppButton variant="primary" block type="submit" :disabled="loading" class="mt-16">
        <Loader2 v-if="loading" :size="18" class="free-form__spin" />
        {{ loading ? 'Envoi...' : config.ctaText }}
      </AppButton>
      <p class="free-form__privacy">
        En soumettant ce formulaire, vous acceptez de recevoir des communications.
        Vos données sont protégées conformément au RGPD.
      </p>
    </template>

    <!-- Success state -->
    <div v-else class="free-form__success">
      <div class="free-form__success-icon">
        <CheckCircle :size="48" />
      </div>
      <h3 class="text-white mt-16">C'est fait !</h3>
      <p class="text-muted mt-8">{{ config.successMessage }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle } from 'lucide-vue-next'
import { freeFormationConfig as config } from '~/data/free-formation'

const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const { trackLead } = useFBPixel()
const { trackGenerateLead } = useGoogleAds()
const { trackConversion } = useLinkedIn()

async function handleSubmit() {
  if (!form.firstName || !form.lastName || !form.email || !form.phone) {
    await showToast('Veuillez remplir tous les champs.', 'error')
    return
  }

  loading.value = true

  try {
    await $fetch('/api/free-formation-lead', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      },
    })

    trackLead()
    trackGenerateLead()
    trackConversion()
    localStorage.setItem('ffm_submitted', 'true')
    submitted.value = true
  } catch {
    await showToast("Une erreur est survenue. Veuillez réessayer.", 'error')
  } finally {
    loading.value = false
  }
}

async function showToast(msg: string, type: 'error' | 'success' = 'error') {
  const { useToast } = await import('vue-toastification')
  const toast = useToast()
  if (type === 'error') toast.error(msg)
  else toast.success(msg)
}
</script>

<style lang="scss" scoped>
.free-form {
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__privacy {
    font-size: $xs;
    color: $text-on-dark-muted;
    text-align: center;
    margin-top: 12px;
    line-height: 1.5;
  }

  &__spin {
    animation: spin 1s linear infinite;
  }

  &__success {
    text-align: center;
    padding: 32px 0;
  }

  &__success-icon {
    color: $orange;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
