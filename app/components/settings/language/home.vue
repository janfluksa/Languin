<script lang="ts" setup>
/**
 * HOME screen
 * - neumí přepínat screeny
 * - pouze oznamuje intent
 */

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'go-detail' | 'go-default' | 'close' | 'go-add'): void
}>()
</script>

<template>
  <div>
    <UCard :ui="{body: 'p-0 sm:p-0 divide-muted', root: 'border border-muted rounded-lg divide-muted'}" class="mb-4">
      <ItemNavigation icon="i-cif-cz" title="Čeština" value="Default" class="border-b-0" @click="emit('go-detail')" />
      <ItemNavigation icon="i-cif-gb" title="English" class="border-b-0"  @click="emit('go-detail')"/>
      <ItemNavigation icon="i-cif-sk" title="Slovenčina" class="border-b-0"  @click="emit('go-detail')"/>
    </UCard>

    <div class="flex justify-between mt-5">
      
      <div class="left">
        <UButton icon="i-lucide-plus" variant="link" size="lg" @click="emit('go-add')">Add language</UButton>
        <UButton icon="i-lucide-star" color="neutral" variant="link" size="lg" @click="emit('go-default')">
          Default
        </UButton>
      </div>
      <div class="right">
        <UButton color="neutral" variant="outline" size="lg" @click="emit('close')">Close</UButton>
      </div>
    </div>
  </div>
</template>
