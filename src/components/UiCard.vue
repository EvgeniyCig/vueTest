<template>
  <article class="card">
    <h2 v-if="$slots.title" class="title">
      <slot name="title" />
    </h2>

    <div class="content">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
}

.title {
  margin: 0 0 var(--space-3);
  font-size: 1.125rem;
}

.content {
  color: var(--text-muted);
  line-height: 1.65;
}
</style>