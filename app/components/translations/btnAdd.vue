<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const openModalNewNode = ref(false)

const toggleModalNewNode = () => {
  openModalNewNode.value = !openModalNewNode.value
}

const emit = defineEmits<{
  (e: 'node-created', payload: {
    newPath: Path
  }): void
}>()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Node',
    kbds: ['N'],
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

defineShortcuts(extractShortcuts(items.value))

interface Path {
  name: string,
  path: string,
}

const handleNodeCreated = ({ newPath }: { newPath: Path }) => {
  openModalNewNode.value = false
  emit('node-created', { newPath })
}

</script>

<template>
  <div>

    <UDropdownMenu :items="items" :content="{ align: 'start', side: 'bottom', sideOffset: 8 }" >
      <UButton label="New" color="neutral" icon="lucide-plus" variant="outline"/>
    </UDropdownMenu>

    <TranslationsNodeCreateModalForm v-model:open="openModalNewNode" @success="handleNodeCreated"/>
    
  </div>
</template>
