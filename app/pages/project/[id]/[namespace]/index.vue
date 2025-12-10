<script setup lang="ts">
const token = useCookie('token')
const route = useRoute()
const projectId = route.params.id
const namespace = route.params.namespace

interface Project {
  _id: string
  name: string
  description: string
}

const { data: project } = await useFetch<Project>(`/api/projects/${projectId}`, {
  headers: {
    Authorization: token.value ? `Bearer ${token.value}` : ''
  }
})

if (!project) navigateTo('/')

</script>


<template>
	<NuxtLayout name="dashboard">

    {{ namespace }}

		<UPageHeader v-if="project" :title=project.name :description=project.description class="border-0"/>
	
		<TranslationsFolders />

	</NuxtLayout>
</template>
