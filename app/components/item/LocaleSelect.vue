<script lang="ts" setup>
import { ref } from 'vue'

const modelValue = defineModel<string | null>()

interface SelectItem {
  value: string
  label: string
  icon: string
}


const locales = (await apiGet<[SelectItem]>('/api/locales/select-items')) ?? []

const selected = ref<SelectItem | undefined>(undefined)

const onChange = () => {
  modelValue.value = selected.value?.value
}
</script>

<template>

<USelectMenu
    v-model="selected"
    :icon="selected?.icon"
    :search-input="{
      placeholder: 'Filter...',
      icon: 'i-lucide-search'
    }"
    :items="locales"
    placeholder="Select locale"
    variant="soft"
    size="lg"
    label="Email"
    @change="onChange"
  />


</template>