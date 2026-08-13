<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.js'

const allTags = [...new Set(posts.flatMap((p) => p.tags || []))].sort()
const active = ref('')

const filtered = computed(() =>
  active.value ? posts.filter((p) => (p.tags || []).includes(active.value)) : []
)

function formatDate(d) {
  return d ? String(d).slice(0, 10) : ''
}
</script>

<template>
  <div class="tag-cloud">
    <button
      v-for="t in allTags"
      :key="t"
      class="tag-btn"
      :class="{ active: active === t }"
      @click="active = active === t ? '' : t"
    >
      {{ t }}
    </button>
  </div>

  <div v-if="active" class="tag-result">
    <h3>标签「{{ active }}」下的文章</h3>
    <ul v-if="filtered.length" class="post-list">
      <li v-for="p in filtered" :key="p.url">
        <a :href="p.url">{{ p.title }}</a>
        <span class="post-date">{{ formatDate(p.date) }}</span>
      </li>
    </ul>
    <p v-else class="empty">没有匹配的文章。</p>
  </div>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.tag-btn {
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s;
}
.tag-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.tag-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}
.tag-result h3 {
  margin: 0 0 12px;
}
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 12px;
  border-radius: 8px;
}
.post-list li:hover {
  background-color: var(--vp-c-bg-soft);
}
.post-list a {
  font-weight: 500;
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
