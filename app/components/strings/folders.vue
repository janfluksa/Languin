<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'



interface Document {
  id: string
  type: string
  name: string
  address: string
  status?: string
}

const toast = useToast()
const { copy } = useClipboard()

const data = ref<Document[]>([
  {
    id: 'gS66dh9',
    type: 'path',
    name: 'Form',
    address: 'authentication.login.form'
  },
    {
    id: 'gS66dh9',
    type: 'path',
    name: 'Links',
    address: 'authentication.login.links'
  },
  {
    id: 'g66dh9',
    type: 'string',
    name: 'Title',
    address: 'authentication.login.title',
    status: 'complete'
  },
  {
    id: 'g66dh9',
    type: 'string',
    name: 'Title',
    address: 'authentication.login.title',
    status: 'new'
  },
  {
    id: 'g66dh9',
    type: 'string',
    name: 'Title',
    address: 'authentication.login.title',
    status: 'missing'
  }
])

const columns: TableColumn<Document>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    id: 'action'
  }
]

function getDropdownActions(user: Document): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          copy(user.id.toString())

          toast.add({
            title: 'User ID copied to clipboard!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit'
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error'
      }
    ]
  ]
}
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1">
    <template #name-cell="{ row }">
      <div class="flex items-center gap-3">
        <UIcon v-if="row.original.type === 'path'" name="i-lucide-folder" size="32" class="text-primary-600"/>
        <UIcon v-else name="i-lucide-languages" size="32" class="text-secondary-400" />
        <div>
          <p class="font-medium text-highlighted">
            {{ row.original.name }}
          </p>
          <p>
            {{ row.original.address }}
          </p>
        </div>
      </div>
    </template>

    <template #status-cell="{ row }">
      <div class="flex items-center gap-3">
        <div v-if="row.original.status">
            <AppTranslationStatus :code="row.original.status"/>
        </div>
      </div>
    </template>

    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          icon="i-lucide-ellipsis-vertical"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
