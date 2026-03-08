<template>
  <div class="theme-toggle">
    <button
      :class="{ active: mode === 'light' }"
      @click="themeStore.setTheme('light')"
    >
      Light
    </button>

    <button
      :class="{ active: mode === 'dark' }"
      @click="themeStore.setTheme('dark')"
    >
      Dark
    </button>

    <button
      :class="{ active: mode === 'system' }"
      @click="themeStore.setTheme('system')"
    >
      System
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const { mode } = storeToRefs(themeStore)
</script>

<style scoped>
.theme-toggle {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

button {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 0.7rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button.active {
  background: var(--primary);
  color: var(--primary-contrast);
  border-color: var(--primary);
}
</style>