<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui'

const items: ContextMenuItem[][] = [
  [
    {
      label: 'Rename',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    }
  ],
  [
    {
      label: 'Delete',
      color: 'error' as const,
      icon: 'i-lucide-trash'
    }
  ]
]
</script>

<template>
  <UContextMenu :items="items" :ui="{ content: 'w-48' }">
      <slot />
  </UContextMenu>
</template>

