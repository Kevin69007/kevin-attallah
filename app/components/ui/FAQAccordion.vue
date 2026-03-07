<template>
  <div class="faq">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['faq__item glass-card-light', { 'faq__item--open': openIndex === index }]"
    >
      <button class="faq__question" @click="toggle(index)">
        <span class="faq__toggle">
          <Plus v-if="openIndex !== index" :size="16" />
          <X v-else :size="16" />
        </span>
        <span class="faq__label">{{ item.question }}</span>
      </button>
      <Transition name="accordion">
        <div v-show="openIndex === index" class="faq__answer">
          <div class="faq__answer-inner">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, X } from 'lucide-vue-next'

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  items: FAQItem[]
}

defineProps<Props>()

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style lang="scss" scoped>
.faq {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__item {
    overflow: hidden;
    transition: all 0.4s $ease-smooth;

    &:hover {
      transform: none;
    }

    &--open {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba($purple, 0.25);
      box-shadow:
        0 6px 24px rgba(0, 0, 0, 0.07),
        0 0 16px rgba($purple, 0.07),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      animation: none;
    }
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 22px 24px;
    color: $text-heading;
    font-size: $body;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;

    @media (max-width: 640px) {
      padding: 18px 16px;
      gap: 12px;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: $text-muted;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);

    .faq__item--open & {
      background: rgba($purple, 0.1);
      border-color: rgba($purple, 0.25);
      color: $purple;
    }

    .faq__item:hover:not(.faq__item--open) & {
      background: rgba(255, 255, 255, 0.2);
      color: $text-heading;
    }

    @media (max-width: 640px) {
      width: 32px;
      height: 32px;
      min-width: 32px;
    }
  }

  &__label {
    flex: 1;
  }

  &__answer {
    overflow: hidden;
  }

  &__answer-inner {
    padding: 0 24px 22px 76px;

    @media (max-width: 640px) {
      padding: 0 16px 18px 60px;
    }

    p {
      color: $text-body;
      line-height: 1.8;
      font-size: $small;
    }
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
