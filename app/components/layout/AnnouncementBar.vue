<template>
  <div v-if="!dismissed" ref="barRef" class="announce">
    <div class="container">
      <NuxtLink to="/formation-gratuite" class="announce__content">
        <Gift :size="14" class="announce__icon" />
        <span class="announce__text">
          <strong>Formation Offerte</strong> — Recevez une formation professionnelle gratuite
          <span class="announce__value">(valeur 99€)</span>
        </span>
        <span class="announce__cta">
          J'en profite
          <ArrowRight :size="14" />
        </span>
      </NuxtLink>
      <button class="announce__close" aria-label="Fermer" @click.stop="dismiss">
        <X :size="14" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gift, ArrowRight, X } from 'lucide-vue-next'

const dismissed = ref(false)
const barRef = ref<HTMLElement | null>(null)
const barHeight = useState('announceBarHeight', () => 0)

onMounted(() => {
  if (localStorage.getItem('announce_dismissed')) {
    dismissed.value = true
    barHeight.value = 0
  } else {
    nextTick(() => {
      if (barRef.value) {
        barHeight.value = barRef.value.offsetHeight
      }
    })
  }
})

function dismiss() {
  dismissed.value = true
  barHeight.value = 0
  localStorage.setItem('announce_dismissed', Date.now().toString())
}
</script>

<style lang="scss" scoped>
.announce {
  background: linear-gradient(90deg, $orange-dark, $orange, $purple);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    color: $text-white;
    font-size: 13px;
    font-weight: 500;
    flex: 1;
    justify-content: center;

    @media (max-width: 640px) {
      font-size: 12px;
      gap: 6px;
    }
  }

  &__icon {
    flex-shrink: 0;

    @media (max-width: 640px) {
      display: none;
    }
  }

  &__text {
    strong {
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .announce__value {
        display: none;
      }
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: $radius-full;
    white-space: nowrap;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &__close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
    transition: color 0.3s ease;

    &:hover {
      color: $text-white;
    }
  }
}
</style>
