---
title: VitePress 快速开始
date: 2026-08-01
tags: [vitepress, vue, markdown]
description: 从零搭建一个 VitePress 站点：环境要求、初始化、目录结构与本地预览。
---

# VitePress 快速开始

本指南帮助你从零搭建一个 VitePress 站点，并部署到 GitHub + Cloudflare。

## 环境要求

| 工具    | 最低版本 | 说明                     |
| ------- | -------- | ------------------------ |
| Node.js | 18+      | 运行时环境               |
| npm     | 9+       | 包管理器（也可用 pnpm/yarn） |
| Git     | 2.x      | 版本控制                 |
| GitHub 账号  | —    | 存放源码仓库             |
| Cloudflare 账号 | —  | 静态托管与部署           |

## 初始化项目

```bash
# 1. 创建并进入项目目录
mkdir tech-notes && cd tech-notes

# 2. 初始化 package.json
npm init -y

# 3. 安装 VitePress
npm install -D vitepress
```

## 添加脚本

在 `package.json` 的 `scripts` 中增加以下三条命令：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

## 创建站点文件

最小目录结构如下：

```text
tech-notes/
├── .vitepress/
│   └── config.mjs        # 站点配置
├── posts/                 # 技术博客（按分类分目录）
│   └── site/
│       └── xxx.md
├── public/                # 静态资源（原样复制到输出目录）
│   └── logo.svg
├── index.md               # 首页
├── tags.md                # 标签聚合页
├── wrangler.toml          # Cloudflare 部署配置
├── package.json
└── .gitignore
```

## 本地预览

```bash
npm run docs:dev
```

浏览器打开终端输出的地址（默认 `localhost:5173`），即可实时预览。

## 生产构建

```bash
npm run docs:build
```

构建产物会输出到 `.vitepress/dist` 目录，这正是后面 Cloudflare 通过 `wrangler.toml` 的 `assets.directory` 要部署的目录。
