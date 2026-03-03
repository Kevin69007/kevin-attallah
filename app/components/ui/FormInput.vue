<template>
  <div :class="['form-group', { 'form-group--dark': dark }]">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      :class="['form-input', { 'form-input--dark': dark }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  dark?: boolean
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  dark: false,
  modelValue: '',
})

defineEmits(['update:modelValue'])
</script>
