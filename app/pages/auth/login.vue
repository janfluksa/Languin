<script setup lang="ts">
import { object, string } from 'yup'
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'

const pending = ref(false)
const error = ref("")
const showPassword = ref(false)

const schema = object({
  email: string()
    .email('Invalid email')
    .required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  error.value = ""
  pending.value = true

		try {
			const response = await $fetch.raw('/api/auth/login', {
				method: 'POST',
				body: event.data
			})

			if (response.status >= 400) {
				const errorData = await response._data as { statusMessage?: string }
				error.value = errorData.statusMessage || 'Login failed'
				return
			}

			// const data = await response._data as { ok: boolean }
			navigateTo('/auth/register')

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


</script>


<template>
	<NuxtLayout name="auth">

			<UPageHeader title="Login" class="border-0"/>

			<div class="flex flex-col gap-4">

				<p>Access allowed for assigned personel only.</p>

        <UForm :disabled="pending" :schema="schema" :state="state" class="py-4 flex flex-col gap-4" @submit="onSubmit">
 
          <UFormField validate-on="blur" label="Email" name="email" size="xl" >
            <UInput v-model="state.email" class="w-full"/>
          </UFormField>

          <UFormField validate-on="change" label="Password" name="password">
            <UInput 
								v-model="state.password"
								size="xl"
								placeholder="Create password"
								:type="showPassword ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }">
							<template #trailing>
								<UButton
									color="neutral"
									variant="link"
									size="sm"
									:icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
									:aria-label="showPassword ? 'Hide password' : 'Show password'"
									:aria-pressed="showPassword"
									aria-controls="password"
									@click="showPassword = !showPassword"
								/>
						  </template>
						</UInput>
          </UFormField>

          <UButton type="submit" size="xl" color="neutral">
            Log in
          </UButton>

          
				<UAlert
					v-show="error"
					color="error"
					:title=error
					icon="i-lucide-triangle-alert"
					variant="soft"
				/>
          
  </UForm>

		

				<div class="flex flex-col gap-2">
					<ULink raw to="/auth/register" class="underline">Register new account</ULink>
					<ULink raw to="/auth/reset-password" class="underline">Forgotten password</ULink>
				</div>

			</div>

	</NuxtLayout>
</template>
