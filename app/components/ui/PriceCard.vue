<template>
  <div class="price-card glass-card">
    <div v-if="badge" class="price-card__badge">
      <GlassBadge variant="orange">{{ badge }}</GlassBadge>
    </div>

    <!-- Countdown Timer -->
    <div v-if="showTimer && !isExpired" class="price-card__timer">
      <Clock :size="16" />
      <span>Offre expire dans <strong>{{ formatted }}</strong></span>
    </div>

    <!-- Prices -->
    <div class="price-card__prices">
      <span v-if="promoPrice" class="price-card__original">{{ normalPrice }}€</span>
      <span class="price-card__current">{{ promoPrice || normalPrice }}€</span>
    </div>

    <p v-if="subtitle" class="price-card__subtitle">{{ subtitle }}</p>

    <slot />

    <div class="price-card__cta mt-24">
      <AppButton variant="primary" block @click="$emit('purchase')">
        {{ ctaText }}
      </AppButton>
    </div>

    <!-- Trust -->
    <div class="price-card__trust">
      <div class="price-card__trust-item">
        <Shield :size="14" />
        <span>Paiement sécurisé</span>
      </div>
      <div class="price-card__trust-item">
        <CreditCard :size="14" />
        <span>CPF éligible</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, Shield, CreditCard } from 'lucide-vue-next'

interface Props {
  normalPrice: number
  promoPrice?: number
  badge?: string
  subtitle?: string
  showTimer?: boolean
  ctaText?: string
}

withDefaults(defineProps<Props>(), {
  showTimer: true,
  ctaText: "S'inscrire maintenant",
})

defineEmits(['purchase'])

const { timeLeft, isExpired, formatted } = useCountdown(60)
</script>

<style lang="scss" scoped>
.price-card {
  padding: 32px;
  text-align: center;

  &__badge {
    margin-bottom: 16px;
  }

  &__timer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba($orange, 0.1);
    border: 1px solid rgba($orange, 0.2);
    border-radius: $radius-full;
    margin-bottom: 24px;
    color: $orange-light;
    font-size: $small;
  }

  &__prices {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  &__original {
    font-size: 1.25rem;
    color: $text-on-dark-muted;
    text-decoration: line-through;
  }

  &__current {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 800;
    color: $text-white;
  }

  &__subtitle {
    color: $text-on-dark-muted;
    font-size: $small;
    margin-bottom: 16px;
  }

  &__trust {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 20px;
  }

  &__trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: $text-on-dark-muted;
    font-size: $xs;
  }
}
</style>
