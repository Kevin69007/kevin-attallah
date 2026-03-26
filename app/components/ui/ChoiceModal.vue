<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="choice-overlay">
        <div class="choice-modal">
          <button class="choice-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <div class="choice-modal__header text-center">
            <span class="choice-modal__badge">BIENVENUE_</span>
            <h2 class="choice-modal__title">
              ON S'ADAPTE <span class="text-purple">A TOI.</span>
            </h2>
            <p class="choice-modal__desc">
              DIS-NOUS OU TU EN ES POUR QU'ON TE GUIDE AU MIEUX.
            </p>
          </div>

          <div class="choice-modal__options">
            <button class="choice-modal__option" @click="$emit('choose', 'create')">
              <Rocket :size="24" class="choice-modal__option-icon" />
              <span class="choice-modal__option-label">JE VEUX CREER MON ENTREPRISE</span>
              <ArrowRight :size="18" />
            </button>

            <button class="choice-modal__option choice-modal__option--boost" @click="$emit('choose', 'boost')">
              <TrendingUp :size="24" class="choice-modal__option-icon" />
              <span class="choice-modal__option-label">JE VEUX BOOSTER MON ENTREPRISE</span>
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X, Rocket, TrendingUp, ArrowRight } from 'lucide-vue-next'

defineProps<{
  visible: boolean
}>()

defineEmits<{
  close: []
  choose: [choice: 'create' | 'boost']
}>()
</script>

<style lang="scss" scoped>
.choice-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.choice-modal {
  position: relative;
  max-width: 520px;
  width: 100%;
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

  &__desc {
    font-family: $font-mono;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-top: 12px;
    color: #000;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 28px;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 18px 20px;
    background: #FFF;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px $purple;
    cursor: pointer;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    text-align: left;
    color: #000;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0px $purple;
      background: $purple;
      color: #FFF;
    }

    &--boost {
      box-shadow: 4px 4px 0px $orange;

      &:hover {
        box-shadow: 8px 8px 0px $orange;
        background: $orange;
      }
    }
  }

  &__option-icon {
    flex-shrink: 0;
  }

  &__option-label {
    flex: 1;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .choice-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .choice-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
