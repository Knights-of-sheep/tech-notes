<script setup>
import { data as posts } from './posts.data.js'

const props = defineProps({
  category: { type: String, required: true }
})

const list = posts.filter((p) => p.category === props.category)

function formatDate(d) {
  return d ? String(d).slice(0, 10) : ''
}
</script>

<template>
  <p v-if="!list.length" class="empty">该分类下暂无文章。</p>
  <ul v-else class="post-list">
    <li v-for="p in list" :key="p.url" class="post-item">
      <a :href="p.url" class="post-link">
        <div>
          <div class="post-title">{{ p.title }}</div>
          <div v-if="p.description" class="post-desc">{{ p.description }}</div>
          <div v-if="p.tags.length" class="post-tags">
            <span v-for="t in p.tags" :key="t" class="post-tag">{{ t }}</span>
          </div>
        </div>
        <span class="post-date">{{ formatDate(p.date) }}</span>
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
  margin-bottom: 8px;
}
.post-link {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
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
  margin-bottom: 4px;
}
.post-desc {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.post-tag {
  font-size: 0.8em;
  padding: 1px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.post-date {
  flex-shrink: 0;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.empty {
  color: var(--vp-c-text-2);
}
</style>
