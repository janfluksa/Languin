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
const state = reactive({
  nodeName: ''
})
const nodeSlug = computed(() => {
  return slugify(state.nodeName)
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
          name: state.nodeName
        }
      }
    )

    emit('success', {
      newPath: result.newPath
    })

    toast.add({
      title: 'Node created',
      description: `Node ${result.newPath.name} was created successfully`,
      color: 'success'
    })

    state.nodeName = ''


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

      <UForm :state="state" class="p-6" @submit="handleSave">
          <UFormField label="Node" size="lg">
            <UInput v-model="state.nodeName" placeholder="Name" class="w-full" />
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
            <UButton label="Create node" :disabled="state.nodeName.length<1" color="neutral" type="submit" />
          </div>
      </UForm>

    </template>
  </UModal>
</template>
