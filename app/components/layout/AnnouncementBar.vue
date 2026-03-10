<template>
  <div v-if="!dismissed" ref="barRef" class="announce glass-card-light">
    <div class="container">
      <NuxtLink to="/formation-gratuite" class="announce__content">
        <Gift :size="14" class="announce__icon" />
        <span class="announce__text">
          Chaque semaine, j'offre une <strong>formation gratuite</strong> à mon réseau pour vous lancer ou booster vos équipes.
        </span>
        <span class="announce__cta">
          Je la veux
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur($glass-blur-heavy) saturate(1.3);
  -webkit-backdrop-filter: blur($glass-blur-heavy) saturate(1.3);

  &:hover {
    transform: none;
  }

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
    color: $text-heading;
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
    color: $orange;

    @media (max-width: 640px) {
      display: none;
    }
  }

  &__text {
    strong {
      font-weight: 700;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    color: #fff;
    background: $orange;
    padding: 4px 12px;
    border-radius: $radius-full;
    white-space: nowrap;
    transition: all 0.3s ease;

    &:hover {
      background: $orange-dark;
    }
  }

  &__close {
    background: none;
    border: none;
    color: $text-muted;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
    transition: color 0.3s ease;

    &:hover {
      color: $text-heading;
    }
  }
}
</style>
