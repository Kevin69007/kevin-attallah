<template>
  <div :class="['form-group', { 'form-group--dark': dark }]">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div class="phone-input" :class="{ 'phone-input--invalid': touched && !isValid }">
      <button
        type="button"
        class="phone-input__country"
        :aria-expanded="open"
        aria-haspopup="listbox"
        @click="open = !open"
      >
        <span class="phone-input__flag">{{ flagEmoji(country) }}</span>
        <span class="phone-input__dial">+{{ dialCode }}</span>
        <ChevronDown :size="14" />
      </button>

      <input
        :id="id"
        type="tel"
        class="phone-input__number"
        :placeholder="placeholder"
        :required="required"
        :value="local"
        @input="onInput"
        @blur="touched = true"
      />

      <Teleport to="body">
        <div v-if="open" class="phone-input__overlay" @click="open = false">
          <div class="phone-input__popup" @click.stop>
            <div class="phone-input__search-wrap">
              <Search :size="14" />
              <input
                v-model="search"
                type="text"
                placeholder="Rechercher un pays"
                class="phone-input__search"
              />
            </div>
            <ul class="phone-input__list" role="listbox">
              <li
                v-for="c in filteredCountries"
                :key="c.code"
                role="option"
                :aria-selected="c.code === country"
                :class="['phone-input__option', { 'phone-input__option--active': c.code === country }]"
                @click="selectCountry(c.code)"
              >
                <span class="phone-input__flag">{{ flagEmoji(c.code) }}</span>
                <span class="phone-input__option-name">{{ c.name }}</span>
                <span class="phone-input__option-dial">+{{ c.dial }}</span>
              </li>
            </ul>
          </div>
        </div>
      </Teleport>
    </div>
    <p v-if="touched && !isValid && local" class="phone-input__error">
      Numéro de téléphone invalide pour ce pays.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, Search } from 'lucide-vue-next'
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js'

interface Props {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  dark?: boolean
  modelValue?: string
  defaultCountry?: CountryCode
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  dark: false,
  modelValue: '',
  defaultCountry: 'FR',
  placeholder: '6 12 34 56 78',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:valid': [valid: boolean]
}>()

const country = ref<CountryCode>(props.defaultCountry)
const local = ref('')
const open = ref(false)
const touched = ref(false)
const search = ref('')

// French country names
const displayNames = typeof Intl !== 'undefined' && (Intl as any).DisplayNames
  ? new (Intl as any).DisplayNames(['fr'], { type: 'region' })
  : null

function countryName(code: string): string {
  return displayNames?.of(code) || code
}

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('')
}

const allCountries = computed(() => {
  return getCountries()
    .map((code) => ({
      code,
      name: countryName(code),
      dial: getCountryCallingCode(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
})

const filteredCountries = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allCountries.value
  return allCountries.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dial.includes(q),
  )
})

const dialCode = computed(() => getCountryCallingCode(country.value))

const parsed = computed(() => {
  if (!local.value) return null
  return parsePhoneNumberFromString(local.value, country.value)
})

const isValid = computed(() => parsed.value?.isValid() ?? false)

function emitValue() {
  const value = isValid.value ? parsed.value!.number : ''
  emit('update:modelValue', value)
  emit('update:valid', isValid.value)
}

function onInput(e: Event) {
  local.value = (e.target as HTMLInputElement).value
  emitValue()
}

function selectCountry(code: CountryCode) {
  country.value = code
  open.value = false
  search.value = ''
  emitValue()
}

// Hydrate once on mount if parent passes an existing E.164 value
onMounted(() => {
  if (!props.modelValue) {
    emit('update:valid', false)
    return
  }
  const p = parsePhoneNumberFromString(props.modelValue)
  if (p?.country) {
    country.value = p.country
    local.value = p.nationalNumber
    emit('update:valid', p.isValid())
  }
})
</script>

<style lang="scss" scoped>
.phone-input {
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 2px solid #000;
  background: #FFF;
  transition: box-shadow 0.2s, transform 0.2s;

  &:focus-within {
    box-shadow: 4px 4px 0px $purple;
    transform: translate(-2px, -2px);
  }

  &--invalid {
    border-color: #E53E3E;

    &:focus-within {
      box-shadow: 4px 4px 0px #E53E3E;
    }
  }

  &__country {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 14px;
    background: #FFF;
    border: none;
    border-right: 2px solid #000;
    cursor: pointer;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 700;
    color: #000;
    white-space: nowrap;
    transition: background 0.2s;

    &:hover {
      background: #F5F5F5;
    }
  }

  &__flag {
    font-size: 1.1rem;
    line-height: 1;
  }

  &__dial {
    font-family: $font-mono;
    font-weight: 700;
  }

  &__number {
    flex: 1;
    min-width: 0;
    padding: 12px 14px;
    border: none;
    background: transparent;
    font-family: $font-mono;
    font-size: 0.95rem;
    color: #000;
    outline: none;

    &::placeholder {
      color: #999;
    }
  }

  &__error {
    margin-top: 6px;
    font-family: $font-mono;
    font-size: 0.7rem;
    color: #E53E3E;
    text-transform: uppercase;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  &__popup {
    width: 100%;
    max-width: 420px;
    max-height: 70vh;
    background: #FFF;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px $purple;
    display: flex;
    flex-direction: column;
  }

  &__search-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border-bottom: 2px solid #000;
    color: #000;
  }

  &__search {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: $font-mono;
    font-size: 0.85rem;
    color: #000;

    &::placeholder {
      color: #999;
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    flex: 1;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #EEE;
    font-family: $font-mono;
    font-size: 0.8rem;
    color: #000;
    transition: background 0.15s;

    &:hover,
    &--active {
      background: $purple;
      color: #FFF;
    }
  }

  &__option-name {
    flex: 1;
    text-transform: uppercase;
    font-weight: 700;
  }

  &__option-dial {
    font-weight: 700;
    opacity: 0.7;
  }
}
</style>
