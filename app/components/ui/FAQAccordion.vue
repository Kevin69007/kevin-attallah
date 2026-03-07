<template>
  <div class="faq">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['faq__item', { 'faq__item--open': openIndex === index }]"
    >
      <button class="faq__question" @click="toggle(index)">
        <span>{{ item.question }}</span>
        <ChevronDown class="faq__icon" :size="20" />
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
import { ChevronDown } from 'lucide-vue-next'

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
  gap: 12px;

  &__item {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: $radius-md;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);

    &--open {
      background: rgba(255, 255, 255, 0.55);
      border-color: rgba($purple, 0.25);
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    color: $text-heading;
    font-size: $body;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: $purple;
    }
  }

  &__icon {
    transition: transform 0.3s ease;
    flex-shrink: 0;
    color: $text-muted;

    .faq__item--open & {
      transform: rotate(180deg);
      color: $purple;
    }
  }

  &__answer {
    overflow: hidden;
  }

  &__answer-inner {
    padding: 0 24px 20px;

    p {
      color: $text-body;
      line-height: 1.7;
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
