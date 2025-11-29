<script setup lang="ts">
const show = ref(false)
const password = ref('')
const value = ref('')

</script>


<template>
	<NuxtLayout name="auth">

			<UPageHeader title="Login" class="border-0"/>

			<div class="flex flex-col gap-4">

				<p>Access allowed for assigned personel only.</p>

				<form action="" class="py-4 flex flex-col gap-4">

					<UFormField label="Email" required>
						<UInput v-model="value" placeholder="Enter your email" size="xl" class="w-full"/>
					</UFormField>

					<UFormField label="Password" required>
						<UInput 
								v-model="password"
								size="xl"
								placeholder="Password"
								:type="show ? 'text' : 'password'"
								class="w-full"
								:ui="{ trailing: 'pe-1' }">
							<template #trailing>
								<UButton
									color="neutral"
									variant="link"
									size="sm"
									:icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
									:aria-label="show ? 'Hide password' : 'Show password'"
									:aria-pressed="show"
									aria-controls="password"
									@click="show = !show"
								/>
						</template>
						</UInput>

					</UFormField>

					<UButton to="/project/123" color="neutral" size="xl" class="justify-center mt-2">Log in</UButton>

				</form>

				<div class="flex flex-col gap-2">
					<ULink raw to="/auth/register" class="underline">Register new account</ULink>
					<ULink raw to="/auth/reset-password" class="underline">Forgotten password</ULink>
				</div>

			</div>

	</NuxtLayout>
</template>
