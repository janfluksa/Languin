<script setup>
  import "~/assets/css/main.css"
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtPage :key="$route.fullPath" />
  </UApp>
</template>