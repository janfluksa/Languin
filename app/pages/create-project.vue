<script setup lang="ts" generic="T extends any">
import LocaleSelect from '~/components/item/LocaleSelect.vue';
import { object, string } from 'yup'

const pending = ref(false)
const error = ref("")

const schema = object({
  projectName: string()
    .min(2, "The project name must be at least 2 characters long")
    .required('Description is required'),
  description: string(),
  defaultLocale: string()
    .required("Select locale"),
})

const state = reactive({
  projectName: undefined,
  description: undefined,
  defaultLocale: undefined
})

const onSubmit = async () => {
  error.value = ""
  pending.value = true

  alert("Submitted")
}

</script>

<template>
  <NuxtLayout name="ground">
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-2xl font-bold mb-4">Create new project</h1>

        <UForm :disabled="pending" :schema="schema" :state="state" class="py-4 flex flex-col gap-4" @submit="onSubmit">
          
          <UFormField validate-on="blur" name="projectName" size="xl" >
            <UInput v-model="state.projectName" placeholder="Project name"  autofocus variant="soft" size="lg" class="w-full" />
          </UFormField>

          <UFormField validate-on="blur" name="description" size="xl" >
            <UInput v-model="state.description" placeholder="Description"  variant="soft" size="lg" class="w-full" />
          </UFormField>

          <UFormField validate-on="blur" label="Default langauge" name="defaultLocale" size="xl" :ui="{ label: 'text-sm ms-3 my-2'}">
            <LocaleSelect v-model="state.defaultLocale" class="w-full" />
          </UFormField>

          <p class="text-xs text-muted ms-3 mt-0">This will be used as fallback languauge when missing any translation 
            in keys. You can change flag in Languages settings.</p>
          
          <div class="flex justify-end gap-2 mt-4">
            <UButton type="submit" size="lg">Create project</UButton>
            <UButton to="/" variant="outline" color="neutral" size="lg">Cancel</UButton>
          </div>
        </UForm>
      

    
    </div>
  </NuxtLayout>
</template>