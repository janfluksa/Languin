<script lang="ts" setup>

</script>

<template>

  <div class="links p-4">
    <ULink to="/" class="p-2">Home</ULink>
   
    <hr style="margin-top: 24px; margin-bottom: 24px;">

    <ULink to="/test/flow">Flow</ULink>
    <ULink to="/test/locales">Locales</ULink>
  </div>
</template>

<style>
.links a {
  display: block;
  padding: .25rem;
  text-decoration: underline;
  font-size: 1.5rem;
}
</style>