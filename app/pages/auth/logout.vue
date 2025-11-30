<script setup lang="ts">

    useCookie('token').value = null
    useCookie('realname').value = null
    useCookie('email').value = null
    useCookie('id').value = null

    navigateTo('/auth/login')

</script>