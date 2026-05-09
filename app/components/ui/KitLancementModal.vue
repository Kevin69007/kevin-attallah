<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="kit-overlay" @click.self="$emit('close')">
        <div class="kit-modal">
          <button class="kit-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <div v-if="!submitted" class="kit-modal__header text-center">
            <span class="kit-modal__badge">KIT_LANCEMENT_</span>
            <h2 class="kit-modal__title">
              🎁 AVANT DE PARTIR, PRENDS LE <span class="text-purple">KIT DE LANCEMENT.</span>
            </h2>
            <p class="kit-modal__desc">
              🚀 LE GUIDE PRATIQUE POUR DÉMARRER TON PROJET D'ENTREPRISE DU BON PIED. GRATUIT, IMMÉDIAT.
            </p>
          </div>

          <KitLancementForm
            id-prefix="kit-modal"
            :class="{ 'mt-24': !submitted }"
            @submitted="submitted = true"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import KitLancementForm from '~/components/ui/KitLancementForm.vue'

defineProps<{
  visible: boolean
}>()

defineEmits(['close'])

const submitted = ref(false)
</script>

<style lang="scss" scoped>
.kit-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.kit-modal {
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  background: #FFF;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px $orange;

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
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .kit-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .kit-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
