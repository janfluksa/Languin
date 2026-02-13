<script setup lang="ts">

const showLanguageSettings = ref(false)

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
// TODO: Raději na 404
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


useHead({
  title: project?.name,
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})

const authName = useCookie('realname')
const dropdownItems = ref([
  [
    {
      label: authName.value,
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      to: '/auth/logout'
    }
  ]
])

</script>

<template>
  
  <div>

    

    <!-- Záhlaví -->
    <div class="flex justify-between mb-8 gap-auto">
      <div class="left">
        <UButton variant="link" color="neutral" class="mr-6">{{ project ? project.name : "Project name" }}</UButton>
      </div>

      <div class="right flex gap-1">
        <TranslationsBtnAdd @node-created="handleNodeCreated" />
        <UInput icon="i-lucide-search" size="md" variant="outline" placeholder="Search..." />
        
        <ProjectSettings>
          <UButton color="neutral" icon="i-lucide-settings" variant="link" />
        </ProjectSettings>

        <SettingsLanguage :show="showLanguageSettings" @update:show="showLanguageSettings = false" />
        <UButton label="Languages" color="neutral" variant="subtle" @click="showLanguageSettings = true"/>
        
        
        <UButton color="info">Share</UButton>

        <UDropdownMenu :items="dropdownItems" :content="{ align: 'end', side: 'bottom', sideOffset: 8 }">
          <UButton :avatar="{ src: 'https://github.com/benjamincanac.png' }" color="neutral" variant="link" />
        </UDropdownMenu>

      </div>
    </div>

    <!-- Header a zpětka -->
    <div v-if="ns?.node.parent">
      <UButton icon="lucide-arrow-left" variant="link" :to="`/project/${ns.node.parent.project}/space/${ns.node.parent.path}`">{{ ns.node.parent.name }}</UButton>
    
      <UPageHeader v-if="project" :title=ns?.node.name class="border-0 mx-3 py-0 pb-8"/>
    </div>

    <!-- Složky -->  
    <div v-if="ns" class="flex flex-wrap gap-4">

        <TranslationsNodeContextMenu v-for="node in ns.subnodes" :key="node._id">
          <UPageCard :to="`/project/${node.project}/space/${node.path}`" variant="subtle" orientation="horizontal" class="w-1/4">
            <div class="flex justify-start items-center gap-2">
              <UIcon name="i-lucide-folder"/>
              <div>{{ node.name }}</div>
          
            </div>
          </UPageCard>
        </TranslationsNodeContextMenu>

    </div>

    <!-- Tabulka klíčů -->
    <translationsKeyList :project="projectId" :namespace="namespace"/>
  </div>

</template>