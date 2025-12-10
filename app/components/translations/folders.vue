<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

const token = useCookie('token')
const route = useRoute()
const projectId = route.params.id

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

</script>

<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />
    
    <UTable :data="translations" :columns="columns" class="flex-1" />

  </div>
</template>
