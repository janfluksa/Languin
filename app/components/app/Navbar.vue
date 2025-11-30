<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const props = defineProps(
  {
    'variant': {
      type: String, 
      default: "standard" 
    }
  }
)

const variant = props.variant

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Docs',
  to: '/docs/getting-started',
  active: route.path.startsWith('/docs/getting-started')
}, {
  label: 'Components',
  to: '/docs/components',
  active: route.path.startsWith('/docs/components')
}, {
  label: 'Figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])

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
    <UHeader>
      <template #title>
        <AppLogo class="h-6 w-auto" />
      </template>

      <UNavigationMenu v-if="variant !== 'basic'" :items="items" />
      
      <template v-if="variant !== 'basic'" #body >
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>

      <template #right>
        <UColorModeButton />

        <UDropdownMenu :items="dropdownItems">
          <UAvatar :alt="authName || ''" size="xl" class="text-md"/>
        </UDropdownMenu>
      </template>

    </UHeader>
</template>