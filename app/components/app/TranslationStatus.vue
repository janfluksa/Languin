<script setup lang="ts">

const props = defineProps(
  {
    'code': {
      type: String, 
      default: "standard" 
    }
  }
)

</script>

<template>
  <UBadge v-if="props.code === 'new'"           color="info" variant="subtle">New</UBadge>
  <UBadge v-else-if="props.code === 'missing'"  color="error" variant="subtle">Missing translations</UBadge>
  <UBadge v-else                                color="success" variant="subtle">OK</UBadge>
</template>