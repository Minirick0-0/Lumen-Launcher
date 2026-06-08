<template>
  <Transition name="lumen-banner">
    <div
      v-if="visible"
      class="lumen-ad-banner non-moveable"
      role="complementary"
      aria-label="Lumen Launcher banner"
    >
      <a
        :href="bannerLinkUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="lumen-ad-banner__link"
        aria-label="Open banner link"
      >
        <img
          :src="bannerUrl"
          alt="Lumen Launcher"
          class="lumen-ad-banner__img"
          width="300"
          height="90"
        />
      </a>
      <button
        class="lumen-ad-banner__close non-moveable"
        type="button"
        aria-label="Dismiss banner"
        @click="dismiss"
      >
        <v-icon size="14">close</v-icon>
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { lumenConfig } from '@/lumen.config'
import { useLocalStorageCacheBool } from '@/composables/cache'

const dismissed = useLocalStorageCacheBool('lumenBannerDismissed', false)
const visible = computed(() => lumenConfig.bannerEnabled && !dismissed.value)

const bannerUrl = lumenConfig.bannerUrl
const bannerLinkUrl = lumenConfig.bannerLinkUrl

function dismiss() {
  dismissed.value = true
}
</script>

<style scoped>
.lumen-ad-banner {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 200;
  width: 300px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.10);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  background: rgba(20, 20, 20, 0.75);
}

.lumen-ad-banner__link {
  display: block;
  width: 100%;
  height: 100%;
}

.lumen-ad-banner__img {
  width: 300px;
  height: 90px;
  object-fit: cover;
  display: block;
}

.lumen-ad-banner__close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s ease;
}

.lumen-ad-banner__close:hover {
  background: rgba(0, 0, 0, 0.80);
}

/* Enter/leave transitions */
.lumen-banner-enter-active,
.lumen-banner-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.lumen-banner-enter-from,
.lumen-banner-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
