<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="ffm-overlay" @click.self="$emit('close')">
        <div class="ffm-modal">
          <button class="ffm-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <div class="ffm-modal__header">
            <span class="ffm-modal__badge">CADEAU_</span>
            <h2 class="ffm-modal__title">
              ATTENDEZ ! ON A UN <span class="text-purple">CADEAU</span> POUR VOUS
            </h2>
          </div>

          <!-- Barred price -->
          <div class="ffm-modal__price">
            <span class="ffm-modal__price-original">{{ config.originalPrice }}€</span>
            <span class="ffm-modal__price-arrow">►</span>
            <span class="ffm-modal__price-free">GRATUIT</span>
          </div>

          <p class="ffm-modal__desc">{{ config.subtitle }}</p>

          <FreeFormationForm class="mt-24" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
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
  background: rgba(0, 0, 0, 0.7);
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
  background: #FFF;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px $purple;

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

  &__header {
    text-align: center;
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

  &__price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    padding: 16px;
    border: 2px solid #000;
    background: #FAFAFA;
  }

  &__price-original {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.3);
    text-decoration: line-through;
  }

  &__price-arrow {
    color: $purple;
    font-size: 1rem;
  }

  &__price-free {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 900;
    color: $purple;
  }

  &__desc {
    font-family: $font-mono;
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.6;
    margin-top: 16px;
    color: #000;
    text-transform: uppercase;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .ffm-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .ffm-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
