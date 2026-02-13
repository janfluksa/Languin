<script lang="ts" setup>
/**
 * DETAIL screen
 * - opět žádná znalost navigace
 */

const emit = defineEmits<{
  (e: 'go-back' | 'do-archive-language'): void
}>()
</script>

<template>
   <div>
   

    <UCard :ui="{body: 'p-0 sm:p-0', root: 'border border-muted rounded-lg'}" class="mb-2">
      <ItemInput title="Name" class="border-b-0x" @click="emit('do-archive-language')">
        <UInput value="Čeština" name="name" variant="none" class="w-full" />
      </ItemInput>

      <ItemInput title="Code" class="border-b-0x"  @click="emit('do-archive-language')">
        <UInput value="cs" name="name" variant="none" class="w-full" />
      </ItemInput>

    
    </UCard>
    <p class="mb-4 text-sm ps-3 pe-2 text-muted">
      Changing this settings will affect your exports and integration. Check it with your Developer.  
    </p>


    <UCard :ui="{body: 'p-0 sm:p-0 divide-muted', root: 'border border-muted rounded-lg divide-muted'}" class="mb-2">
        <ItemInput title="Flag">
          <SettingsLanguageFlagSelect class="w-full"/>
        </ItemInput>
    </UCard>
    <p class="mb-4 text-sm ps-3 pe-2 text-muted">
      Select from <a href="https://icon-sets.iconify.design/cif/" target="_blank">Core UI Flags</a> icon set.
      In case you miss your flag here, let us know in feedback section.
    </p>


    <div class="flex justify-between mt-6">
      <div class="left">

        <UButton icon="i-lucide-trash" color="error" variant="link" size="lg" @click="emit('do-archive-language')">
          Delete
        </UButton>
      </div>

      <div class="right flex gap-2">
        <UButton color="primary" variant="solid" size="lg" @click="emit('go-back')">Save</UButton>
        <UButton color="neutral" variant="outline" size="lg" @click="emit('go-back')">Cancel</UButton>
      </div>
    </div>
  </div>
</template>
