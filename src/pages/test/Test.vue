<template>
  <main class="page">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Vue 3 + Pinia + TypeScript</p>
        <h1>Готовый шаблон темы</h1>
        <p class="subtitle">
          CSS variables, system theme, manual override, router-view и типизированный store.
        </p>
      </div>

      <ThemeToggle />
    </header>

    <section class="grid">
      <UiCard>
        <template #title>Как это работает</template>
        Store хранит режим темы, а CSS берёт цвета из токенов на корневом
        элементе. При переключении меняется только <code>data-theme</code> у
        <code>&lt;html&gt;</code>.
      </UiCard>

      <UiCard>
        <template #title>Почему без мигания</template>
        До загрузки Vue маленький скрипт в <code>index.html</code> сразу
        выставляет нужный <code>data-theme</code>. Поэтому первый кадр уже
        рендерится в правильной теме.
      </UiCard>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import ThemeToggle from '../../components/ThemeToggle.vue'
import UiCard from '../../components/UiCard.vue'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

onBeforeUnmount(() => {
  themeStore.cleanupSystemListener()
})
</script>

<style scoped>
.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.hero-copy {
  max-width: 700px;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--primary);
  font-weight: 700;
  letter-spacing: 0.02em;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.05;
}

.subtitle {
  margin: 1rem 0 0;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.65;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

code {
  background: var(--surface-2);
  padding: 0.15rem 0.35rem;
  border-radius: 8px;
}
</style>