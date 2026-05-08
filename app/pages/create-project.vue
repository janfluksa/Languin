<script setup lang="ts" generic="T extends any">
import { object, string, array } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'

const pending = ref(false)
const error = ref("")
const submitted = ref(false)
const form = ref()
const token = useCookie<string | null>('token')

const schema = object({
  projectName: string()
    .min(2, "The project name must be at least 2 characters long")
    .required('Description is required'),

  description: string(),

  defaultLng: string()
    .required("Select default language"),

  otherLngs: array()
    .of(string())
    .required()
    .min(1, "Select at least one additional language")
    .test(
      'not-include-default',
      'Default language cannot be in translations',
      function (value) {
        return !value?.includes(this.parent.defaultLng)
      }
    ),
    
})

const state = reactive({
  projectName: "",
  description: "",
  defaultLng: "",
  otherLngs: []
})

type Schema = {
  projectName: string
  description?: string
  defaultLng: string
  otherLngs: (string | undefined)[]
}

const submit = async (event: FormSubmitEvent<Schema>) => {
  submitted.value = true
  
  const valid = await form.value.validate()
  if (!valid) return
  
  error.value = ""
  pending.value = true

  try {
    await $fetch('/api/projects', {
      method: 'POST',
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : ''
      },
      body: {
        projectName: event.data.projectName ?? state.projectName,
        description: event.data.description ?? state.description,
        defaultLng: event.data.defaultLng ?? state.defaultLng,
        otherLngs: event.data.otherLngs.filter((lng): lng is string => !!lng)
      }
    })

    navigateTo('/')
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'data' in err) {
      const errorData = (err as { data?: { statusMessage?: string } }).data
      error.value = errorData?.statusMessage || 'Creating project failed'
    } else {
      error.value = 'Network error'
    }
  } finally {
    pending.value = false
  }
}

</script>

<template>
  <NuxtLayout name="ground">
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-2xl font-bold mb-4">Create new project</h1>

        <UForm 
          ref="form"
          :disabled="pending" 
          :schema="schema" 
          :state="state" 
          :validate-on="submitted ? ['input'] : []"
          class="py-4 flex flex-col gap-4" 
          @submit="submit">
          
          <UFormField name="projectName" size="xl" >
            <UInput v-model="state.projectName" placeholder="Project name"  autofocus variant="subtle" size="xl" class="w-full" />
          </UFormField>

          <UFormField name="description" size="xl" >
            <UInput v-model="state.description" placeholder="Description"  variant="subtle" size="lg" class="w-full" />
          </UFormField>

          <UFormField 
            label="Default langauge" 
            name="defaultLng" 
            help="Select fallback main languauge."
            size="xl" 
            :ui="{ label: 'text-sm ms-3 my-2', help: 'text-sm ms-3'}">
            <ItemLocaleSelect v-model="state.defaultLng" class="w-full" variant="subtle"/>
          </UFormField>



          <UFormField 
            label="Translations langauges" 
            placeholder="Select multiple locales "
            help="Select one or more languages for translations"
            :hint="state.otherLngs.length > 0 ? state.otherLngs.length.toString()+' selected' : ''"
            name="otherLngs" 
            size="xl" 
            :ui="{ label: 'text-sm ms-3 my-2', help: 'text-sm ms-3', hint: 'me-3 text-sm'}">
            <ItemLocaleMultiselect v-model="state.otherLngs" :multiple="true" variant="subtle" class="w-full" />
          </UFormField>

          
          <div class="flex justify-end gap-2 mt-4">
            <UButton type="submit" size="lg">
              Create project
            </UButton>
            <UButton to="/" variant="outline" color="neutral" size="lg">Cancel</UButton>
          </div>

          <UAlert
            v-show="error"
            color="error"
            :title="error"
            icon="i-lucide-triangle-alert"
            variant="soft"
          />
        </UForm>

      

    
    </div>
  </NuxtLayout>
</template>
