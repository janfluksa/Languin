<script setup lang="ts">

const props = defineProps(
  {
    'title': {
      type: String, 
      default: "Missing title" 
    },
    'caption': {
      type: String, 
      default: null 
    },
    'value': {
      type: Boolean, 
      default: false 
    },
    'message': {
      type: String, 
      default: null 
    },
    'success': {
      type: String, 
      default: null 
    },
    'error': {
      type: String, 
      default: null 
    },
    'icon': {
      type: String,
      default: null
    },
    'to': {
      type: String, 
      default: null 
    }
  }
)

const switchValue = ref(true)

switchValue.value = props.value




</script>

<template>
  <div class="item">
    <ULink
    :to="to"
    class="hover:bg-muted w-full group block ps-3 pe-3 py-3 transition"
  >
      <div class="flex items-center gap-3">

        <UIcon v-if="icon" :name="icon" class="text-neutral-500 group-hover:text-primary" />
        <div class="flex grow flex-col">

          <div class="flex grow justify-between">
            <div class="text-sm text-neutral-900 font-semibold">{{ title }}</div>

            <div class="text-sm text-neutral-400 pe-1">
              <USwitch v-model="switchValue" />
            </div>

          </div>

          <div v-if="caption" class="text-md text-start text-neutral-500">{{ caption }}</div>

          <div v-if="error" class="text-xs font-bold text-error-500 flex items-center gap-1 pt-1">
            <UIcon name="i-material-symbols-warning-rounded" /> 
            <p>{{ error }}</p> 
          </div>

          <div v-if="message" class="text-xs font-semibold text-neutral-700 flex items-center gap-1 pt-1.5">
            <UIcon name="i-material-symbols-info"/> 
            <p>{{ message }}</p> 
          </div>

          <div v-if="success" class="text-xs font-semibold text-success-700 flex items-center gap-1 pt-1.5">
            <UIcon name="i-material-symbols-check-circle"/>
            <p>{{ success }}</p> 
          </div>

        </div>

      </div>
    </ULink>
  </div>
</template>

<style>
.item {
    border-top: solid 1px var(--ui-border);
}
.item:first-child {
    border-top: none;
}
</style>