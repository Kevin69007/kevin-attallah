<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="ffm-overlay" @click.self="$emit('close')">
        <div class="ffm-modal">
          <button class="ffm-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <div class="ffm-modal__header">
            <GlassBadge variant="orange-light">
              <Gift :size="14" />
              {{ config.badgeText }}
            </GlassBadge>
            <h2 class="ffm-modal__title mt-16">
              Attendez ! On a un <span class="gradient-text">cadeau</span> pour vous
            </h2>
          </div>

          <!-- Barred price -->
          <div class="ffm-modal__price">
            <span class="ffm-modal__price-original">{{ config.originalPrice }}€</span>
            <span class="ffm-modal__price-arrow">→</span>
            <span class="ffm-modal__price-free gradient-text">GRATUIT</span>
          </div>

          <p class="ffm-modal__desc">{{ config.subtitle }}</p>

          <FreeFormationForm class="mt-24" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X, Gift } from 'lucide-vue-next'
import { freeFormationConfig as config } from '~/data/free-formation'

defineProps<{
  visible: boolean
}>()

defineEmits(['close'])
</script>

<style lang="scss" scoped>
.ffm-overlay {
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

.ffm-modal {
  position: relative;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24px) saturate(1.3);
  -webkit-backdrop-filter: blur(24px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: $radius-lg;
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(0, 0, 0, 0.03);

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

  &__header {
    text-align: center;
  }

  &__title {
    font-family: $font-heading;
    font-size: $h3;
    font-weight: 800;
    line-height: 1.3;
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
  }

  &__price-original {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-muted;
    text-decoration: line-through;
  }

  &__price-arrow {
    color: $text-muted;
    font-size: 1.25rem;
  }

  &__price-free {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 900;
  }

  &__desc {
    color: $text-body;
    font-size: $small;
    text-align: center;
    line-height: 1.7;
    margin-top: 12px;
  }
}

// Transition
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s $ease-smooth;

  .ffm-modal {
    transition: all 0.3s $ease-smooth;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .ffm-modal {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }
}
</style>
