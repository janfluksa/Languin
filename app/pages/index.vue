<script setup>
const token = useCookie('token')
const { data } = await useFetch('/api/projects', {
  headers: {
    Authorization: token.value ? `Bearer ${token.value}` : ''
  }
})

</script>

<template>
  <NuxtLayout name="ground">
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-2xl font-bold">Moje projekty</h1>

      <div v-if="data.projects.length == 0">Nemáte žádné projekty</div>

      <ItemNavigation 
        v-for="project in data.projects" 
        v-else :key="project._id" 
        :title="project.name" :to="`/project/${project._id}`" image="" :caption=project.description />

    </div>
  </NuxtLayout>
</template>