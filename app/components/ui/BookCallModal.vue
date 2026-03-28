<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="call-overlay" @click.self="$emit('close')">
        <div class="call-modal">
          <button class="call-modal__close" aria-label="Fermer" @click="$emit('close')">
            <X :size="20" />
          </button>

          <div class="call-modal__header text-center">
            <span class="call-modal__badge">AUDIT_GRATUIT_</span>
            <h2 class="call-modal__title">
              ON ANALYSE TON BUSINESS <span class="text-orange">GRATUITEMENT.</span>
            </h2>
            <p class="call-modal__desc">
              30 MINUTES AVEC KEVIN POUR IDENTIFIER CE QUI BLOQUE ET COMMENT L'IA PEUT PROPULSER TON ENTREPRISE.
            </p>
          </div>

          <div class="call-modal__benefits">
            <div class="call-modal__benefit">
              <CheckCircle :size="18" />
              <span>Audit personnalise de ton activite</span>
            </div>
            <div class="call-modal__benefit">
              <CheckCircle :size="18" />
              <span>Solutions concretes adaptees a ta realite</span>
            </div>
            <div class="call-modal__benefit">
              <CheckCircle :size="18" />
              <span>Sans engagement, 100% gratuit</span>
            </div>
          </div>

          <a
            :href="bookingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="call-modal__cta"
          >
            <Phone :size="18" />
            JE RESERVE MON AUDIT GRATUIT
            <ArrowRight :size="18" />
          </a>

          <p class="call-modal__privacy">
            PLACES LIMITEES. RESERVE TON CRENEAU MAINTENANT.
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X, CheckCircle, Phone, ArrowRight } from 'lucide-vue-next'
import { externalLinks } from '~/data/external-links'

defineProps<{
  visible: boolean
}>()

defineEmits(['close'])

const bookingUrl = externalLinks.booking.propulseAvecIA
</script>

<style lang="scss" scoped>
.call-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.call-modal {
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

    .text-orange { color: $orange; }
  }

  &__desc {
    font-family: $font-mono;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-top: 12px;
    color: #000;
  }

  &__benefits {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
  }

  &__benefit {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-mono;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;

    svg {
      flex-shrink: 0;
      color: $orange;
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin-top: 24px;
    padding: 16px 24px;
    background: #000;
    color: #FFF;
    border: 4px solid #000;
    font-family: $font-mono;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;

    &:hover {
      background: $orange;
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px #000;
    }
  }

  &__privacy {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: 12px;
    text-transform: uppercase;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .call-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .call-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
