<script setup lang="ts">
const route = useRoute()
const projectId = computed(() => route.params.id as string)
const namespace = computed(() => route.params.namespace as string)

const ns = ref<Namespace | null>(null)
const loading = ref(false)
const error = ref<Error | null>(null)

interface Project {
  _id: string,
  name: string,
  description: string,
}

interface Node {
  _id: string,
  name: string,
  path: string,
  project: string,
  parent?: Node
}

interface Namespace {
  subnodes: [Node],
  node: Node,
}

const fetchNamespace = async () => {
  loading.value = true
  error.value = null

  try {
    ns.value = await apiGet<Namespace>(
      `/api/projects/${projectId.value}/node/${namespace.value}`
    )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    error.value = e
  } finally {
    loading.value = false
  }
}

const project = await apiGet<Project>(`/api/projects/${projectId.value}`)
await fetchNamespace()

// Pokud projekt neexistuje, přesměruj na home
watchEffect(() => {
  if (!project) {
    navigateTo('/')
  }
})

interface Path {
  name: string,
  path: string,
}

const handleNodeCreated = async ({ newPath }: { newPath: Path }) => {
  await fetchNamespace()
  console.log(newPath)
}


</script>


<template>
	<NuxtLayout name="dashboard">

      <UPageHeader v-if="project" :title=project.name :description=project.description class="border-0"/>

      <TranslationsBtnAdd @node-created="handleNodeCreated" />

      <div v-if="ns?.node.parent">
        <UButton icon="lucide-arrow-left" :to="`/project/${ns.node.parent.project}/${ns.node.parent.path}`">{{ ns.node.parent.name }}</UButton>
      </div>
      
      
        <div v-if="ns" >
          <div  v-for="node in ns.subnodes" :key="node._id">

            <TranslationsNodeContextMenu>
              <UPageCard :to="`/project/${node.project}/${node.path}`" orientation="horizontal" class="w-1/3">
                <div class="flex justify-start items-center gap-2">
                  <UIcon name="i-lucide-folder"/>
                  <div>{{ node.name }}</div>
              
                </div>
              </UPageCard>
            </TranslationsNodeContextMenu>

          </div>
        </div>
    

	</NuxtLayout>
</template>
