<script setup lang="ts">



onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') return
})
</script>

<template>
  <div>

    <AppNavbar variant="basic" />

    <UMain>
      <NuxtLayout >
        <UContainer class="w-4/12 pt-8">
          <slot />
        </UContainer>
      </NuxtLayout>
    </UMain>



   
  </div>
</template>

<style>

</style>