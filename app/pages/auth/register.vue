<script setup lang="ts">
import { object, string, ref as yupRef } from 'yup'
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'

const pending = ref(false)
const error = ref("")
const showPassword = ref(false)

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
	firstname: undefined,
	lastname: undefined,
	passwordRepeat: undefined
})

const handleResetForm = () => {
		state.email = undefined
		state.password = undefined
		state.firstname = undefined
		state.lastname = undefined
		state.passwordRepeat = undefined	
}

const schema = object({
	firstname: string()
		.required('Required'),
	lastname: string()
		.required('Required'),
	email: string()
		.email('Invalid email')
		.required('Required'),
	password: string()
		.min(8, 'Must be at least 8 characters')
		.required('Required'),
	passwordRepeat: string()
		.oneOf([yupRef('password')], 'Passwords must match')
		.required('Required')
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  error.value = ""
  pending.value = true

		try {
			const response = await $fetch.raw('/api/auth/register', {
				method: 'POST',
				body: event.data
			})

			if (response.status >= 400) {
				const errorData = await response._data as { statusMessage?: string }
				error.value = errorData.statusMessage || 'Registration failed'
				return
			}

			if (response._data && 'token' in response._data) {
				useCookie('token').value = response._data.token
				useCookie('realname').value = response._data.realname
				useCookie('email').value = response._data.email
				useCookie('id').value = response._data.id

				// Vymazat formulář
				handleResetForm()

				navigateTo('/')
			}

		} catch (err: unknown) {

			if (err && typeof err === 'object' && 'data' in err) {
				const errorData = (err as { data?: { statusMessage?: string } }).data
				error.value = errorData?.statusMessage || 'Registration failed'
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

			<UPageHeader title="Create account" class="border-0"/>

			<div class="flex flex-col gap-4">

				<p>Access allowed for assigned personel only.</p>

				<UForm 
					:disabled="pending" 
					:schema="schema" 
					:state="state" 
					@submit="onSubmit"
					class="py-4 flex flex-col gap-4">

					<UFormField label="First name" name="firstname" required>
						<UInput 
							v-model="state.firstname" 
							placeholder="Enter your first name" 
							size="xl" 
							class="w-full" />
					</UFormField>

					<UFormField label="lastname" name="lastname" required>
						<UInput v-model="state.lastname" placeholder="Enter your lastname" size="xl" class="w-full"/>
					</UFormField>

					<UFormField label="Email" name="email" required>
						<UInput v-model="state.email" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

					<UFormField label="Password" name="password" required>
						<UInput 
								v-model="state.password"
								size="xl"
								placeholder="Password"
								:type="showPassword ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }" />
							

					</UFormField>

					<UFormField label="Repeat Password" name="passwordRepeat"	 required>
						<UInput 
								v-model="state.passwordRepeat"
								size="xl"
								placeholder="Password"
								:type="showPassword ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }" />
						

					</UFormField>

					<UButton type="submit" size="xl" color="neutral" class="justify-center mt-2">
            Create account
          </UButton>

				</UForm>

				<div class="flex flex-col gap-2">
					<ULink raw to="/auth/login" class="underline">Log in instead</ULink>
				</div>

			</div>

	</NuxtLayout>
</template>
