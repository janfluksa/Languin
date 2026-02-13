<script lang="ts" setup>

  import type { TableColumn } from '@nuxt/ui'

  const props = defineProps(
    {
      project: {
        "type" : String,
        "default" : null
      },
      namespace:{
        "type" : String,
        "default" : null
      },
    }
  )

  interface Translation {
    _id: string,
    namespace: string,
    locale: string,
    key: string,
    fullKey: string,
    ast: object,
    version: number,
    status: Text,
    history: object,
    statusHistory: object,
    createdAt: Date,
    updatedAt: Date,
  }

  const columns: TableColumn<Translation>[] = [
    {
      accessorKey: 'key',
      header: 'Key',
      cell: ({ row }) => row.getValue('key')
    }, 
    {
      accessorKey: 'status',
      header: 'Status'
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translations = await apiGet<Translation | any>(`/api/projects/${props.project}/translations/${props.namespace}`)

</script>

<template>

  <div v-if="translations.length > 0">
    <UTable :data="translations" :columns="columns" class="flex-1" />
  </div>


  
</template>