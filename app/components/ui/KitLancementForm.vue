<template>
  <div class="kit-form">
    <template v-if="!submitted">
      <form class="kit-form__form" @submit.prevent="handleSubmit">
        <FormInput
          :id="`${idPrefix}-lastName`"
          v-model="form.lastName"
          label="Nom"
          placeholder="Dupont"
          required
        />
        <FormInput
          :id="`${idPrefix}-firstName`"
          v-model="form.firstName"
          label="Prénom"
          placeholder="Jean"
          required
        />
        <FormInput
          :id="`${idPrefix}-email`"
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="jean@example.com"
          required
        />
        <PhoneInput
          :id="`${idPrefix}-phone`"
          v-model="form.phone"
          label="Téléphone"
          required
          @update:valid="phoneValid = $event"
        />
        <AppButton variant="primary" block type="submit" :disabled="loading" class="mt-16">
          <Loader2 v-if="loading" :size="18" class="kit-form__spin" />
          {{ loading ? 'ENVOI...' : 'JE REÇOIS MON KIT' }}
        </AppButton>
        <p class="kit-form__privacy">
          🔒 AUCUN SPAM. JUSTE DE LA VALEUR.
        </p>
      </form>
    </template>

    <div v-else class="kit-form__success text-center">
      <div class="kit-form__success-icon">
        <CheckCircle :size="48" />
      </div>
      <h3>C'EST ENVOYÉ !</h3>
      <p>VÉRIFIE TA BOÎTE EMAIL POUR ACCÉDER À TON KIT DE LANCEMENT.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle } from 'lucide-vue-next'
import PhoneInput from '~/components/ui/PhoneInput.vue'

withDefaults(defineProps<{ idPrefix?: string }>(), { idPrefix: 'kit' })

const emit = defineEmits<{ submitted: [] }>()

const loading = ref(false)
const submitted = ref(false)
const phoneValid = ref(false)

const form = reactive({
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
})

const { trackLead } = useFBPixel()
const { trackGenerateLead } = useGoogleAds()
const { trackConversion } = useLinkedIn()

async function handleSubmit() {
  if (!form.lastName || !form.firstName || !form.email) {
    const { useToast } = await import('vue-toastification')
    useToast().error('Veuillez remplir tous les champs.')
    return
  }

  if (!phoneValid.value) {
    const { useToast } = await import('vue-toastification')
    useToast().error('Numéro de téléphone invalide.')
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
    trackConversion()
    localStorage.setItem('kit_submitted', 'true')
    submitted.value = true
    emit('submitted')
  } catch {
    const { useToast } = await import('vue-toastification')
    useToast().error('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.kit-form {
  &__form {
    display: flex;
    flex-direction: column;
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
</style>
