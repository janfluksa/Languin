<script lang="ts" setup>

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

  const translations = await apiGet<Translation>(`/api/projects/${props.project}/translations`)

</script>

<template>
  <h1>
    keyList template
  </h1>
  <p>
    Project {{ project }} <br>
  </p>
  <p v-if="namespace">Namespace: {{  namespace }}</p>
  <p v-else>Namespace is Home</p>

  {{  translations  }}
  
</template>