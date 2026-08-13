<script setup>
import { data as posts } from './posts.data.js'

const props = defineProps({
  limit: { type: Number, default: 8 }
})

const list = posts.slice(0, props.limit)

function formatDate(d) {
  return d ? String(d).slice(0, 10) : ''
}
</script>

<template>
  <ul class="post-list">
    <li v-for="p in list" :key="p.url" class="post-item">
      <a :href="p.url" class="post-link">
        <span class="post-title">{{ p.title }}</span>
        <span class="post-meta">
          <span v-if="p.category" class="post-category">{{ p.category }}</span>
          <span class="post-date">{{ formatDate(p.date) }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-item {
  margin-bottom: 4px;
}
.post-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s;
}
.post-link:hover {
  background-color: var(--vp-c-bg-soft);
}
.post-title {
  font-weight: 600;
}
.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.post-category {
  padding: 1px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  font-size: 0.85em;
}
.post-date {
  font-variant-numeric: tabular-nums;
}
</style>
