<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import { computed } from 'vue' 

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const token = useCookie('token')
const route = useRoute()
const projectId = computed(() => route.params.id as string)
const namespace = computed(() => route.params.namespace as string)

const nodeName = ref("")
const nodeSlug = computed(() => {
  return slugify(nodeName.value)
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void,
  (e: 'success', payload: {
    newPath: Path
  }): void
}>()

const openModalNewNode = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value)
})

const handleClose = () => {
  openModalNewNode.value = false 
}


interface Response {
  success: string,
  newPath: Path
}

interface Path {
  name: string,
  path: string,
}

const toast = useToast()

const handleSave = async () => {
  try {
    const result = await $fetch<Response>(
      `/api/projects/${projectId.value}/node/${namespace.value}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: {
          name: nodeName.value
        }
      }
    )

    emit('success', {
      newPath: result.newPath
    })


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      title: 'Chyba',
      description:
        err?.data?.message ||
        err?.message ||
        'Došlo k chybě při ukládání',
      color: 'error'
    })
  }
}

</script>

<template>
  <UModal v-model:open="openModalNewNode">
    <template #content>

      <div class="p-6">
        <UFormField label="Node" size="lg">
          <UInput v-model="nodeName" placeholder="Name" class="w-full" />
        </UFormField>

        <div>
          <p class="text-xs mt-2">
            <span v-if="namespace" class="text-gray-500">{{ namespace }}</span>
            <span v-show="nodeSlug.length>0" class="text-gray-500">.</span>
            <span class="text-gray-700 font-semibold">{{ nodeSlug }}</span>
          </p>
        </div>

        <div class="text-right mt-4">
          <UButton label="Cancel" color="neutral" variant="outline" class="w-fit mr-1" @click="handleClose" />
          <UButton label="Create node" :disabled="nodeName.length<1" color="neutral" @click="handleSave" />
        </div>
      </div>

    </template>
  </UModal>
</template>
