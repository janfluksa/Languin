<script setup lang="ts" generic="T extends any">
import { array, object, string } from 'yup'
import type { InferType, Schema } from 'yup'
import FlagSelect from '~/components/settings/language/flagSelect.vue';
import type { FormSubmitEvent } from '@nuxt/ui';

const pending = ref(false)
const error = ref("")
const token = useCookie('token')

const validationSchema = object({
  nativeName: string()
    .min(2)
    .required(),
  nativeCountry: string(),
  code: string(),
  description: string(),
  localizedNames: object(),
  pluralization: array().of(string())
  .min(2)
  .required(),
  flag: object(),
})

const directions = ref([
  {
    label: "LTR (Left to right) ➡",
    value: "ltr"
  },  {
    label: "⬅ (من اليمين إلى اليسار) RTL",
    value: "rtl"
  },
])

const plForms = ref(['zero', 'one', 'two', 'few', 'many', 'other'])

const state = reactive({
  nativeName: undefined,
  nativeCountry: undefined,
  code: undefined,
  direction: "ltr",
  localizedNames: {},
  pluralization: [],
  flag: {},
})

type Schema = InferType<typeof validationSchema>

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  error.value = ""
  pending.value = true

		try {
			const response = await $fetch.raw('/api/locales', {
				method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
				body: event.data
			})

			if (response.status >= 400) {
				const errorData = await response._data as { statusMessage?: string }
				error.value = errorData.statusMessage || 'Login failed'
				return
			}

			if (response._data) {
				alert("ok")

				// Vymazat formulář
				handleResetForm()

				// navigateTo('/')
			}

		} catch (err: unknown) {

			if (err && typeof err === 'object' && 'data' in err) {
				const errorData = (err as { data?: { statusMessage?: string } }).data
				error.value = errorData?.statusMessage || 'Login failed'
			} else {
				error.value = 'Network error'
			}

		} finally {
			pending.value = false
		}
}

const handleResetForm = () => {
		// reset inputs
}

</script>

<template>
  <NuxtLayout name="ground">
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-2xl font-bold mb-4">Create new locale</h1>

        <UForm :disabled="pending" :validation-schema="validationSchema" :state="state" class="py-4 flex flex-col gap-4" @submit="onSubmit">
          

          <UFormField label="Native name" name="nativeName" >
            <UInput v-model="state.nativeName" placeholder="e.g. Deutsch" size="xl" autofocus class="w-full" />
          </UFormField>


          <UFormField label="Contry" name="nativeCountry" hint="Optional">
            <UInput v-model="state.nativeCountry" placeholder="e.g. Deutschland" size="lg" class="w-full" />
          </UFormField>


          <UFormField 
            name="code" help="In case you filled a country use full locale code. (e.g. ln-LN)">
            <UInput v-model="state.code" placeholder="Code eg. 'en' or 'en-US'" class="w-full" />
          </UFormField>


          <UFormField label="Direction" name="direction" >
            <USelect v-model="state.direction" :items="directions" class="w-full" />
          </UFormField>


          <UFormField 
            label="Pluralization forms" 
            name="pluralization" 
            validate-on="lostFocus"
            description="Select two or more forms" 
            help="Define how many forms created language have. e.g. for english it one and many"
            >
            <USelectMenu v-model="state.pluralization" multiple :items="plForms" class="w-full" />
          </UFormField>

    
          <UFormField 
            label="Flag" 
            name="flag" 
            help="Select flag from CIF library"
            >
            <FlagSelect v-model="state.flag" variant="outline" class="w-full" />
          </UFormField>
          <p>Source: <ULink to="https://icon-sets.iconify.design/cif/" target="_blank">CoreUI Flags</ULink></p>

         
          <div class="flex justify-end gap-2 mt-4">
            <UButton type="submit" size="lg">Create locale</UButton>
            <UButton to="/superadmin/locales" variant="outline" color="neutral" size="lg">Cancel</UButton>
          </div>


        </UForm>

        {{ state }}
      

    
    </div>
  </NuxtLayout>
</template>