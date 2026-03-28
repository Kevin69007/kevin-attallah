<template>
  <div ref="barRef" class="announce">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gift, ArrowRight } from 'lucide-vue-next'

const barRef = ref<HTMLElement | null>(null)
const barHeight = useState('announceBarHeight', () => 0)

onMounted(() => {
  nextTick(() => {
    if (barRef.value) {
      barHeight.value = barRef.value.offsetHeight
    }
  })
})
</script>

<style lang="scss" scoped>
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes icon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.announce {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: linear-gradient(90deg, $purple, #8B45E6, $orange, $purple);
  background-size: 300% 100%;
  animation: gradient-shift 6s ease infinite;
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
    gap: 10px;
    padding: 10px 0;
    color: #FFF;
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
    color: #FFF;
    animation: icon-pulse 2s ease-in-out infinite;

    @media (max-width: 640px) {
      display: none;
    }
  }

  &__text {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    strong {
      font-weight: 900;
      color: #FFF;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: $font-mono;
    font-weight: 700;
    font-size: 12px;
    color: $purple;
    background: #FFF;
    padding: 5px 14px;
    border: 2px solid #FFF;
    white-space: nowrap;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s, transform 0.2s;

    &:hover {
      background: #000;
      color: #FFF;
      border-color: #000;
      transform: translateY(-1px);
    }
  }
}
</style>
