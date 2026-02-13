<script setup lang="ts">

</script>

<template>

  <UModal 
  fullscreen
  title="Jazyky"
  :ui="{
          body: 'flex flex-col gap-6',
        }"
  >
  <slot />

    <template #body>
      <UCard 
        :ui="{
          body: 'p-0 sm:p-0 divide-y divide-default',
        }"
      >
          <ItemNavigation 
          title="Hlavní jazyk" 
          value="English"
          />

      </UCard>

      <UCard 
        :ui="{
          body: 'p-0 sm:p-0 divide-y divide-default',
        }"
      >


          <ItemNavigation 
          title="Čeština" 
          caption="cs_CZ" 
          />

          <ItemNavigation 
          title="Deutsch" 
          caption="de_DE" 
          error="Neuhrazené platby"
          />


      </UCard>
      
    </template>

    <template #footer>
      <UButton icon="i-lucide-plus">přidat jazyk</UButton>
    </template>

  </UModal>


</template>