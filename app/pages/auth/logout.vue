<script setup lang="ts">




const logout = async () => {
  
  try {
    await $fetch('/api/auth/logout', {
      method: 'GET'
    })

    navigateTo('/')

  } catch (err) {
    alert("Chyba odhlášení")
    console.error('API error:', err)

    

  } 
}
</script>

<template>
  <button @click="logout">Odhlásit</button>
</template>