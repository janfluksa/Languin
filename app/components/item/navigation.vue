<script setup lang="ts">
const props = defineProps(
  {
    'title': {
      type: String, 
      default: "standard" 
    },
    'to': {
        type: String,
        default: null
    },
    'image': {
        type: String,
        default: null
    },
    'caption': {
        type: String,
        default: null
    }
  }
)

const title = props.title
</script>

<template>
    <ULink :to="to" class="navigation-item">
        <UCard 
            variant="soft" 
            class=" transition-colors duration-200
                hover:bg-gray-100 hover:border-gray-300 
                dark:hover:bg-gray-800 dark:hover:border-gray-700">

            <div class="flex flex-row gap-4">

                <div class="flex-none">
                    <UAvatar v-if="!image" icon="i-lucide-languages" size="xl" />
                    <UAvatar v-else :image="image" size="xl" />
                </div>

                <div class="flex-1 flex-row">
                    <h2 class="text-xl font-bold">{{ title }}</h2>
                    <p v-show="caption !== null" class="text-sm font-normal">{{ caption }}</p>
                </div>

                <div class="flex flex-col justify-center">
                    <UIcon name="i-lucide-chevron-right" class="size-5" />
                </div>
            </div>
        </UCard>
    </ULink>
 </template>