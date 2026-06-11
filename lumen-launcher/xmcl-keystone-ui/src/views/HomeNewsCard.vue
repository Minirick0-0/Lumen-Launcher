<template>
  <v-card class="news-card flex flex-col h-full overflow-hidden">
    <v-card-title class="flex items-center gap-2 flex-none">
      <v-icon size="20">feed</v-icon>
      Noticias de Minecraft
    </v-card-title>
    <div class="news-list no-drag flex-grow overflow-y-auto px-3 pb-3 flex flex-col gap-2">
      <a
        v-for="n in news"
        :key="n.id"
        class="news-item"
        :href="n.readMoreLink"
        :title="n.text"
        @click.prevent="open(n.readMoreLink)"
      >
        <img class="news-item__img" :src="n.imageUrl" loading="lazy" :alt="n.title">
        <div class="news-item__body">
          <span class="news-item__title">{{ n.title }}</span>
          <span class="news-item__meta">{{ n.category }} · {{ n.date }}</span>
        </div>
      </a>
      <div v-if="!news.length && !isValidating" class="text-sm opacity-50 px-1 py-2">
        Sin noticias disponibles
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useMinecraftNews } from '@/composables/minecraftNews'

const { news, isValidating } = useMinecraftNews()

function open(link: string) {
  window.open(link, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.news-card {
  background: var(--color-card-bg);
  backdrop-filter: blur(var(--blur-card));
}

.news-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.news-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.news-item__img {
  width: 84px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.news-item__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.news-item__title {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item__meta {
  font-size: 0.65rem;
  opacity: 0.5;
}
</style>
