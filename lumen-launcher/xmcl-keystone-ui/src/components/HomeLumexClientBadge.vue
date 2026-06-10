<template>
  <div class="lumex-badge" :title="`Lumex Client ${LUMEX_VERSION}`">
    <div class="lumex-badge__icon" aria-hidden="true">
      <!-- Meteor/comet icon representing the Meteor Client fork -->
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.5 3.5L8.5 15.5M20.5 3.5L14 3.5M20.5 3.5L20.5 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 12L6 18M9 15L4 20M15 9L10 14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
    <span class="lumex-badge__name">Lumex</span>
    <span class="lumex-badge__version">{{ LUMEX_VERSION }}</span>
  </div>
</template>

<script lang="ts" setup>
const LUMEX_VERSION = '26.1.2'
</script>

<style scoped>
.lumex-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  cursor: default;
  user-select: none;
  transition: background 0.2s ease, border-color 0.2s ease;
  height: 28px;
}

.lumex-badge:hover {
  background: rgba(255, 255, 255, 0.10);
  border-color: rgba(255, 255, 255, 0.22);
}

.lumex-badge__icon {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
  flex-shrink: 0;
}

.lumex-badge__name {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1;
}

.lumex-badge__version {
  font-size: 0.65rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 1px 5px;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
}
</style>
