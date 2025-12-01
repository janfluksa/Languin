export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.$fetch = $fetch.create({
    onRequest({ options }) {
      const token = useCookie('token') 
      console.log(`Token přidán ${token}`)
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    }
  })
})
