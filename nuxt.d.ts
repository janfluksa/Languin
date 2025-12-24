import type { $Fetch } from 'nitropack'

declare module '#app' {
  interface NuxtApp {
    $apiFetch: $Fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $apiFetch: $Fetch
  }
}

export {}
