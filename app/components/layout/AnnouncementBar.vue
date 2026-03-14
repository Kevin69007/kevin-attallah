<template>
  <div v-if="!dismissed" ref="barRef" class="announce">
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
  background: #FFF;
  border-bottom: 3px solid #000;

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
    color: #000;
    font-family: $font-mono;
    font-size: 13px;
    font-weight: 700;
    flex: 1;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;

    @media (max-width: 640px) {
      font-size: 11px;
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
      color: $purple;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: $font-mono;
    font-weight: 700;
    font-size: 12px;
    color: #FFF;
    background: #000;
    padding: 5px 14px;
    border: 2px solid #000;
    white-space: nowrap;
    text-transform: uppercase;
    transition: background 0.2s;

    &:hover {
      background: $purple;
      border-color: $purple;
    }
  }

  &__close {
    background: none;
    border: none;
    color: #000;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
    transition: color 0.2s;

    &:hover {
      color: $purple;
    }
  }
}
</style>
