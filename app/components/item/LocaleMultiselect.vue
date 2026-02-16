<script lang="ts" setup>
import { ref, watch } from 'vue'

const modelValue = defineModel<string[]>({ default: [] })

interface SelectItem {
  value: string
  label: string
  icon: string
}

const locales = (await apiGet<SelectItem[]>('/api/locales/select-items')) ?? []

// vybrané položky jako pole
const selected = ref<SelectItem[]>([])

// synchronizace do modelValue (string[])
watch(selected, (val) => {
  modelValue.value = val.map(i => i.value)
}, { deep: true })
</script>

<template>
  <USelectMenu
    v-model="selected"
    multiple
    :search-input="{
      placeholder: 'Filter...',
      icon: 'i-lucide-search'
    }"
    :items="locales"
    placeholder="Select locales"
    variant="soft"
    size="lg"
  />
</template>