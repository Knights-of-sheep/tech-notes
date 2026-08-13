---
title: Vue 3 组合式 API 笔记
date: 2026-08-10
tags: [vue, javascript]
description: 组合式 API 的核心概念与常见用法速查。
---

# Vue 3 组合式 API 笔记

组合式 API（Composition API）是 Vue 3 的核心特性，让逻辑可以按功能聚合、复用。

## 要点

- **`setup` 语法糖**：`<script setup>` 让组件代码更简洁。
- **`ref` 与 `reactive`**：`ref` 用于基本类型，`reactive` 用于对象。
- **生命周期钩子**：`onMounted`、`onUnmounted` 等，与选项式 API 一一对应。

## 示例

```js
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
```

> 写博客时，在文件顶部 `---` 之间填好 `title` / `date` / `tags` / `description`，首页、侧边栏、标签页都会自动更新。
