---
title: Node.js 异步编程要点
date: 2026-08-05
tags: [node, javascript]
description: Promise、async/await 与错误处理的速查笔记。
---

# Node.js 异步编程要点

Node.js 的异步模型是理解后端代码的基础。

## 核心

- **Promise**：链式调用，避免回调地狱。
- **`async` / `await`**：让异步代码看起来像同步。
- **错误处理**：`try/catch` 包裹 `await`，或用 `.catch()`。

## 示例

```js
async function fetchData(url) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
```
