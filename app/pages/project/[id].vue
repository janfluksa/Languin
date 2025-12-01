<script setup lang="ts">
const { data: myProjects } = await useFetch('/api/projects/my')
</script>


<template>
	<NuxtLayout name="dashboard">

		<div v-for="project in myProjects" :key="project.projectname">
			<UPageHeader :title=project.projectname :decription=project.description class="border-0"/>
		</div>

		<StringsFolders />

	</NuxtLayout>
</template>
