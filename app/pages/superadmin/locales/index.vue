<script lang="ts" setup>

interface Locale {
  _id: string,
  code: string,
  nativeName: string,
  nativeCountry: string,
}

const locales = await apiGet<[Locale]>('/api/locales')

</script>

<template>  
  <UPage>
    <UContainer>

      <h1 class="text-2xl mt-4">System Locales</h1>

            <UButton to="/superadmin/locales/id" variant="outline" icon="i-lucide-plus" size="lg">Add</UButton>

      <ItemNavigation v-for="locale in locales" :key="locale._id" :title="locale.code" to="/superadmin/locales/${_id}"/>
      
    </UContainer>
  </UPage>
</template>