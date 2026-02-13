<script setup lang="ts" generic="T extends any">

interface Project {
  _id: string,
  name: string,
  description: string
}

const projects = await apiGet<[Project]>('/api/projects')

</script>

<template>
  <NuxtLayout name="ground">
    <div class="flex flex-col gap-4 p-4">

      
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">My projects</h1>
        <UButton icon="i-lucide-plus" color="neutral" to="/create-project" size="md">New</UButton>
      </div>

      <div v-if="!projects">Nemáte žádné projekty</div>

      <ItemNavigationCard 
        v-for="project in projects" 
        v-else :key="project._id" 
        :title="project.name" :to="`/project/${project._id}/space/`" image="" :caption=project.description />

    </div>
  </NuxtLayout>
</template>