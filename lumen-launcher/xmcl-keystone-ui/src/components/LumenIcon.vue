<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="0" y="2.5" width="6" height="2.2" rx="1.1" :fill="main" />
    <rect x="0" y="7" width="4.8" height="2.2" rx="1.1" :fill="main" opacity="0.72" />
    <rect x="0" y="11.5" width="3.6" height="2.2" rx="1.1" :fill="main" opacity="0.48" />
    <path d="M13 4.5L18.5 7.5L13 10.5L7.5 7.5Z" :fill="top" />
    <path d="M18.5 7.5V13.5L13 16.5V10.5Z" :fill="main" opacity="0.62" />
    <path d="M7.5 7.5V13.5L13 16.5V10.5Z" :fill="main" opacity="0.8" />
  </svg>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: number
    /** Render with the Lumen purple branding instead of currentColor */
    colored?: boolean
  }>(),
  { size: 22, colored: false },
)

const main = computed(() => (props.colored ? '#7c3aed' : 'currentColor'))
const top = computed(() => (props.colored ? '#a855f7' : 'currentColor'))
</script>
