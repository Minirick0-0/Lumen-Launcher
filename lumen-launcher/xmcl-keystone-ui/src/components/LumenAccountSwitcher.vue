<template>
  <v-menu
    v-model="menuOpen"
    location="bottom end"
    :close-on-content-click="false"
    min-width="220"
    max-width="280"
  >
    <template #activator="{ props: menuProps }">
      <button
        v-bind="menuProps"
        type="button"
        class="lumen-account-btn non-moveable"
        :aria-label="t('accountSwitcher.current', { name: displayName })"
        :aria-expanded="menuOpen"
      >
        <PlayerAvatar
          class="lumen-account-btn__avatar"
          :src="gameProfile?.textures?.SKIN?.url"
          :dimension="22"
        />
        <span class="lumen-account-btn__name">{{ displayName }}</span>
        <v-icon size="14" class="lumen-account-btn__caret">
          {{ menuOpen ? 'expand_less' : 'expand_more' }}
        </v-icon>
      </button>
    </template>

    <v-list density="compact" class="lumen-account-menu pa-0">
      <v-list-subheader class="lumen-account-menu__header">
        {{ t('accountSwitcher.title') }}
      </v-list-subheader>

      <v-list-item
        v-for="u in users"
        :key="u.id"
        :active="u.id === userProfile.id"
        active-color="primary"
        class="lumen-account-menu__item"
        @click="switchUser(u.id)"
      >
        <template #prepend>
          <PlayerAvatar
            class="mr-2 rounded-full overflow-hidden"
            :src="getAvatar(u)"
            :dimension="28"
          />
        </template>
        <v-list-item-title>{{ getDisplayName(u) }}</v-list-item-title>
        <v-list-item-subtitle class="text-xs opacity-60">{{ u.authority }}</v-list-item-subtitle>
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-item
        class="lumen-account-menu__item"
        @click="addAccount"
      >
        <template #prepend>
          <v-icon size="18" class="mr-2">add</v-icon>
        </template>
        <v-list-item-title>{{ t('accountSwitcher.addAccount') }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        class="lumen-account-menu__item"
        @click="manageAccounts"
      >
        <template #prepend>
          <v-icon size="18" class="mr-2">manage_accounts</v-icon>
        </template>
        <v-list-item-title>{{ t('accountSwitcher.manage') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import PlayerAvatar from '@/components/PlayerAvatar.vue'
import { kUserContext } from '@/composables/user'
import { useUserMenuControl } from '@/composables/userMenu'
import { injection } from '@/util/inject'
import type { UserProfile } from '@xmcl/runtime-api'

const { gameProfile, userProfile, users, select } = injection(kUserContext)
const userMenu = useUserMenuControl()
const { t } = useI18n()

const menuOpen = ref(false)

const displayName = computed(() => {
  const name = gameProfile.value?.name
  return name && name.length > 0 ? name : userProfile.value?.username || t('accountSwitcher.noAccount')
})

function getDisplayName(u: UserProfile): string {
  const selected = u.profiles[u.selectedProfile]
  return selected?.name || u.username || '—'
}

function getAvatar(u: UserProfile): string {
  const selected = u.profiles[u.selectedProfile]
  return (selected as any)?.textures?.SKIN?.url ?? ''
}

function switchUser(id: string) {
  select(id)
  menuOpen.value = false
}

function addAccount() {
  menuOpen.value = false
  userMenu.show('login')
}

function manageAccounts() {
  menuOpen.value = false
  userMenu.show('overview')
}
</script>

<style scoped>
.lumen-account-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px 3px 4px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  height: 28px;
  max-width: 180px;
}

.lumen-account-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
}

.lumen-account-btn__avatar {
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.lumen-account-btn__name {
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}

.lumen-account-btn__caret {
  flex-shrink: 0;
  opacity: 0.6;
}

.lumen-account-menu {
  border-radius: 14px !important;
  overflow: hidden;
}

.lumen-account-menu__header {
  font-size: 10px !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
  padding: 8px 12px 4px;
  min-height: unset;
}

.lumen-account-menu__item {
  border-radius: 8px !important;
  margin: 1px 4px;
  min-height: 40px;
}
</style>
