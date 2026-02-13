<script setup lang="ts">

import Logo from '~/components/app/Logo.vue'
const toast = useToast()


onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') return


  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})


const authName = useCookie('realname')

const dropdownItems = ref([
  [
    {
      label: authName.value,
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      to: '/auth/logout'
    }
  ]
])

</script>

<template>
  <div>


    <UMain>
      <NuxtLayout >
      
        <UDashboardGroup>


 
            <UDashboardPanel :default-size='10'>

              <Logo />

              <div class="p-4 flex gap-1 flex-col">
                <UButton to="/" color="neutral" variant="outline">Home</UButton>
                <br>
                <UButton to="/" color="neutral" variant="outline">Translations</UButton>
                <br>
                <UButton to="/" color="neutral" variant="outline">Integration</UButton>
              </div>

              <UDropdownMenu :items="dropdownItems">
                <UButton :avatar="{ src: 'https://github.com/benjamincanac.png' }" color="neutral" variant="ghost" class="w-full" />
              </UDropdownMenu>
              
            </UDashboardPanel>
            <UDashboardPanel id="content" resizable class="py-4"> 
              <UContainer>
                <slot />
              </UContainer>
            </UDashboardPanel>




        </UDashboardGroup>
      </NuxtLayout>
    </UMain>



   
  </div>
</template>

<style>

</style>

