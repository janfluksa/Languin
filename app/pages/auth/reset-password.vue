<script setup lang="ts">
import { ref, watch } from 'vue'
const value = ref('')
const show = ref(false)
const password = ref('')
const passwordRepeat = ref('')
const state = ref(1)

const pin = ref([])

const formState = (n: number) => {
	state.value = n
}

watch(pin, (newPin) => {
	if (newPin.length == 6) state.value = 3
})

</script>


<template>
	<NuxtLayout name="auth">

			<UPageHeader title="Reset Password" class="border-0"/>

			
			<div v-if="state == 1" class="flex flex-col gap-4 mb-12">

				<p>In case you forgotten your password, you can create new.</p>

				<form action="" class="py-4 flex flex-col gap-4">

					<UFormField label="Email" required>
						<UInput v-model="value" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

					<UButton  color="error" size="xl" class="justify-center mt-2" variant="outline" @click="formState(2)">Send reset link</UButton>

				</form>


				<div class="flex flex-col gap-2">
					<ULink raw to="/auth/login" class="underline">Back to Log in</ULink>
				</div>

			</div>

			
			<div v-if="state == 2"  class="flex flex-col gap-4 mb-12">

				<p>Check your email. We've send you reset PIN code. Maybe it will be in Spam folder.</p>

				<form action="" class="py-4 flex flex-col gap-4">

					<UPinInput v-model="pin" otp size="xl" :length="6" />

				</form>
				
			</div>

			
			<div v-if="state == 3" class="flex flex-col gap-4">

				<p>Create new password.</p>

				<UAlert
					color="success"
					title="The PIN you entered is correct."
					icon="i-lucide-check"
				/>

				<form action="" class="py-4 flex flex-col gap-4">

					
					<UFormField label="Password" required>
						<UInput 
								v-model="password"
								size="xl"
								placeholder="Password"
								:type="show ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }" />
					</UFormField>

					<UFormField label="Repeat Password" required>
						<UInput 
								v-model="passwordRepeat"
								size="xl"
								placeholder="Password"
								:type="show ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }" />
					</UFormField>

					<UButton to="/project/123" color="primary" size="xl" class="justify-center mt-2" variant="outline">Create new password</UButton>

				</form>


			</div>

	</NuxtLayout>
</template>
