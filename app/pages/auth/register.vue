<script setup lang="ts">
const show = ref(false)
const password = ref('')
const passwordRepeat = ref('')
const email = ref('')
const name = ref('')
const surname = ref('')

</script>


<template>
	<NuxtLayout name="auth">

			<UPageHeader title="Create account" class="border-0"/>

			<div class="flex flex-col gap-4">

				<p>Access allowed for assigned personel only.</p>

				<form action="" class="py-4 flex flex-col gap-4">

					<UFormField label="First name" required>
						<UInput v-model="name" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

					<UFormField label="Surname" required>
						<UInput v-model="surname" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

					<UFormField label="Email" required>
						<UInput v-model="email" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

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

					<UButton to="/project/123" color="neutral" size="xl" class="justify-center mt-2">Create account</UButton>

				</form>

				<div class="flex flex-col gap-2">
					<ULink raw to="/auth/login" class="underline">Log in instead</ULink>
				</div>

			</div>

	</NuxtLayout>
</template>
