<script lang="ts" setup>
/**
 * DETAIL screen
 * - opět žádná znalost navigace
 */

const emit = defineEmits<{
  (e: 'go-back'): void
}>()
</script>

<template>
  <div>
    <p>Page 2</p>

    <a
      class="underline cursor-pointer"
      @click="emit('go-back')"
    >
      Go to 1
    </a>
  </div>
</template>
