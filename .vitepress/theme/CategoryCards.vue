<script setup>
import { data as posts } from './posts.data.js'

const labels = {
  frontend: '前端',
  backend: '后端',
  devops: 'DevOps',
  ai: 'AI',
  database: '数据库'
}

const categories = [...new Set(posts.map((p) => p.category))]
  .filter(Boolean)
  .map((c) => ({
    name: c,
    label: labels[c] || c,
    count: posts.filter((p) => p.category === c).length,
    url: `/posts/${c}/`
  }))
</script>

<template>
  <div class="category-grid">
    <a v-for="c in categories" :key="c.name" :href="c.url" class="category-card">
      <span class="category-label">{{ c.label }}</span>
      <span class="category-count">{{ c.count }} 篇</span>
    </a>
  </div>
</template>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.category-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, transform 0.2s;
}
.category-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}
.category-label {
  font-weight: 600;
}
.category-count {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
</style>
