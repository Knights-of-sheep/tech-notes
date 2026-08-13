# 关于本站

本站是一个技术笔记示例站点，用于演示完整的 **VitePress + GitHub + Cloudflare** 部署流程。

## 技术栈

- **VitePress** — 基于 Vite 的静态站点生成器
- **GitHub** — 源码托管与版本管理
- **Cloudflare（Workers + Assets）** — 免费静态托管 + 全球 CDN

## 目录结构

```text
tech-notes/
├── .vitepress/
│   ├── config.mjs
│   └── theme/              # 自定义主题与组件
├── guide/                  # 站点搭建/部署教程
│   ├── getting-started.md
│   └── deploy.md
├── posts/                  # 技术博客（按技术领域分类）
│   ├── frontend/
│   ├── backend/
│   ├── devops/
│   ├── ai/
│   └── database/
├── public/
│   └── logo.svg
├── index.md                # 首页（最新文章 + 分类）
├── tags.md                 # 标签聚合页
├── about.md
├── wrangler.toml
├── package.json
├── .gitignore
└── README.md
```
