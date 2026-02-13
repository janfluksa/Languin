<script lang="ts" setup>
import { ref } from 'vue'
import { useAnimatedHeight } from '~/composables/useAnimatedHeight'

type ScreenKey = 'home' | 'detail' | 'add' | 'archive'

type ScreenConfig = {
  name: ScreenKey
  title: string
  showCloseBtn: boolean
  showBackBtn: boolean
}

const screens: Record<ScreenKey, ScreenConfig> = {
  home: {
    name: 'home',
    title: 'Project languages',
    showCloseBtn: true,
    showBackBtn: false
  },
  detail: {
    name: 'detail',
    title: 'Detail',
    showCloseBtn: false,
    showBackBtn: true
  },
  add: {
    name: 'add',
    title: 'Add language',
    showCloseBtn: false,
    showBackBtn: true
  },
  archive: {
    name: 'archive',
    title: 'Archive',
    showCloseBtn: false,
    showBackBtn: true
  }
}

/* ------------------------------------------------------------------
 * Modal state
 * ------------------------------------------------------------------ */
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const open = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const active = ref(screens.home)
const transitionName = ref<'forward' | 'back'>('forward')

const goToStep = (
  key: keyof typeof screens,
  direction: 'forward' | 'back'
) => {
  transitionName.value = direction
  active.value = screens[key]
}

const closeModal = () => {
  open.value = false
  emit('update:show', false)
}

/* ------------------------------------------------------------------
 * Animated height (COMPOSABLE)
 * ------------------------------------------------------------------ */
const { wrapper, content, height } =
  useAnimatedHeight(open, active)
</script>

<template>
  <UModal 
  v-model:open="open" 
  :ui="{ 
    body: 'overflow-x-hidden bg-muted p-3 sm:p-3 pt-1 sm:pt-1', 
    header: 'bg-muted border-0', 
    overlay: 'bg-inverted/40'}
    ">
   <slot />

    <!-- ================= HEADER ================= -->
    <template #header>
      <UButton
        v-if="active.showBackBtn"
        variant="link"
        class="py-1.5 ps-0 pe-1.5"
        @click="goToStep('home', 'back')"
      >
        <UIcon name="i-lucide-arrow-left" class="size-5" />
      </UButton>

      <h2 class="text-highlighted font-semibold">
        {{ active.title }}
      </h2>

      <UButton
        v-if="active.showCloseBtn"
        variant="link"
        class="p-1.5 absolute top-4 end-4"
        @click="closeModal"
      >
        <UIcon name="i-lucide-x" class="size-5" />
      </UButton>
    </template>

    <!-- ================= BODY ================= -->
    <template #body>
      <!-- Animated height wrapper -->
      <div
        ref="wrapper"
        class="overflow-hidden transition-[height] duration-100 ease-in-out"
        :style="{ height: height + 'px' }"
      >
        <!-- Actual content (measured by composable) -->
        <div ref="content">
          <Transition mode="out-in" :name="transitionName">
            <!-- HOME -->
            <SettingsLanguageHome 
              v-if="active.name === 'home'" 
              :open="open" 
              @close="closeModal" 
              @go-detail="goToStep('detail', 'forward')"
              @go-archive="goToStep('archive', 'forward')"
              @go-add="goToStep('add', 'forward')"
            />

            <!-- DETAIL -->
            <SettingsLanguageDetail 
              v-else-if="active.name === 'detail'" 
              @go-back="goToStep('home', 'back')"
            />

            <!-- ARCHIVE -->
            <SettingsLanguageArchive 
              v-else-if="active.name === 'archive'" 
              @go-back="goToStep('home', 'back')"
            />

            <!-- ADD -->
            <SettingsLanguageAdd 
              v-else-if="active.name === 'add'" 
              @go-back="goToStep('home', 'back')"
            />


          </Transition>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style>
/* ================= FORWARD ================= */
.forward-enter-active {
  transition: transform 0.2s ease-in, opacity 0.2s;
}

.forward-leave-active {
  transition: transform 0.1s ease-out, opacity 0.1s;
}

.forward-enter-from {
  transform: translateX(100px);
  opacity: 0;
}

.forward-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

/* ================= BACK ================= */
.back-enter-active {
  transition: transform 0.2s ease-in, opacity 0.2s;
}

.back-leave-active {
  transition: transform 0.1s ease-out, opacity 0.1s;
}

.back-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}

.back-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
