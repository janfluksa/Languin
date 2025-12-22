<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { DropdownMenuItem } from '@nuxt/ui'
import slugify from '@sindresorhus/slugify'
import { computed } from 'vue' 

const token = useCookie('token')
const route = useRoute()
const projectId = route.params.id

const nodeName = ref("")
const nodeSlug = computed(() => {
  return slugify(nodeName.value)
})


const submitDisabled = ref(true)
const openModalNewNode = ref(false)

const toggleModalNewNode = () => {
  openModalNewNode.value = !openModalNewNode.value
}

const handleClose = () => {
  openModalNewNode.value = false 
}


interface Translation {
  _id: string
  key: string
  namespace: string,
  status: string,
  ast: string
}

const { data: translations } = await useFetch<Translation[]>(`/api/projects/${projectId}/translations`, {
  headers: {
    Authorization: token.value ? `Bearer ${token.value}` : ''
  }
})

const columns: ColumnDef<Translation>[] = [
  {
    accessorKey: 'key',
    header: 'Key',
  },
  {
    accessorKey: 'ast',
    header: 'KEY',
    cell: ({ row }) => {
      return row
    }
  },
  {
    accessorKey: 'ast',
    header: 'TEXT',
    cell: ({ row }) => {
      const raw = row.original.ast

      try {
        const parsed = JSON.parse(raw)
        return parsed.parts?.[0]?.value || '(empty)'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return '(invalid JSON)'
      }
    }
  },
]

const breadcrumbs = ref([
  {
    label: 'Home',
    to: '/project/692dc89f46f8842181f7d9c5'
  },  {
    label: 'Auth',
    to: '/project/692dc89f46f8842181f7d9c5/auth'
  },
  {
    label: 'Login',
    to: '/project/692dc89f46f8842181f7d9c5/auth.login'
  },
  {
    label: 'Form',
    to: '/project/692dc89f46f8842181f7d9c5/auth.login.form'
  }
])

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Node',
    icon: 'i-lucide-folder-tree',
    onSelect() {
      toggleModalNewNode()
    }
  },
  {
    label: 'Translation Key',
    icon: 'i-lucide-languages'
  }
])

</script>

<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />

    <UDropdownMenu
    :items="items"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8
    }"
    :ui="{
      content: 'w-48'
    }"
  >
    <UButton label="New" color="neutral" icon="lucide-plus" variant="outline" />
  </UDropdownMenu>
        

     <UModal v-model:open="openModalNewNode">

        <template #content>
          <div class="p-6">
            <UFormField label="Name" size="lg">
              <UInput v-model="nodeName" placeholder="Name" class="w-full" />
            </UFormField>

            <div>
              <p class="text-xs mt-2">
                <span class="text-gray-500">auth</span>
                <span v-show="nodeSlug.length>0" class="text-gray-500">.</span>
                <span class="text-gray-700 font-semibold">{{ nodeSlug }}</span>
              </p>
            </div>

            <div class="text-right mt-4">
              <UButton label="Cancel" color="neutral" variant="outline" class="w-fit mr-1" @click="handleClose" />
              <UButton label="Create node" :disabled=submitDisabled color="neutral" />
            </div>

          </div>

        </template>

       
      </UModal>
  
    
    <UTable :data="translations" :columns="columns" class="flex-1" />

  </div>
</template>
