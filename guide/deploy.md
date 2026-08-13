# 部署到 GitHub + Cloudflare Pages

本页是完整的实操教程，带你从本地 VitePress 站点一路部署到 Cloudflare Pages。

## 整体流程

```text
本地开发 → git init → 推送到 GitHub → Cloudflare Pages 关联仓库 → 自动构建部署 → 访问线上站点
```

## 第一步：初始化 Git 仓库

在项目根目录执行：

```bash
git init
git add .
git commit -m "init: VitePress tech notes"
```

创建 `.gitignore`，排除依赖与构建产物：

```text
node_modules/
.vitepress/dist/
.vitepress/cache/
.DS_Store
```

## 第二步：创建 GitHub 仓库并推送

1. 登录 [GitHub](https://github.com) → 点击右上角 **+** → **New repository**。
2. 填写仓库名（例如 `tech-notes`），选择 **Public**（Cloudflare Pages 免费额度对公开仓库即可，私有仓库需要额外配置），**不要**勾选自动初始化 README。
3. 将本地仓库与远程关联并推送：

```bash
git remote add origin https://github.com/<你的用户名>/tech-notes.git
git branch -M main
git push -u origin main
```

## 第三步：Cloudflare Pages 连接仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 左侧菜单进入 **Workers & Pages** → 点击 **Create application** → 选择 **Pages** 标签页。
3. 点击 **Connect to Git**，授权并选择你的 GitHub 账号与 `tech-notes` 仓库。
4. 点击 **Begin setup** 进入构建配置。

## 第四步：填写构建配置

关键三项按如下填写：

| 配置项               | 值                       |
| -------------------- | ------------------------ |
| Project name         | `tech-notes`（可自定义） |
| Production branch    | `main`                   |
| Build command        | `npm run docs:build`     |
| Build output directory | `.vitepress/dist`      |

> **提示**：Cloudflare 默认 Node 版本可能偏低，可在下方 **Environment variables** 添加变量 `NODE_VERSION`，值填 `20` 或 `22`，确保与本地一致。

## 第五步：部署与访问

1. 点击 **Save and Deploy**，Cloudflare 会自动 `npm install` 并执行构建命令。
2. 构建完成后，页面会显示分配好的域名，形如 `https://tech-notes.pages.dev`。
3. 此后每次 `git push` 到 `main` 分支，Cloudflare Pages 都会自动重新构建部署。

## 可选：绑定自定义域名

在项目页面的 **Custom domains** 标签页点击 **Set up a custom domain**，输入你的域名并按提示添加 CNAME 记录即可。

## 常见问题

### 构建时 Node 版本报错

在 Cloudflare Pages 的构建配置中添加环境变量 `NODE_VERSION=20`。

### 页面样式/资源 404

检查 `.vitepress/config.mjs` 中的 `base` 配置。部署到 `*.pages.dev` 根域名时应为 `'/'`；若部署在子路径则需改为对应路径。

### 推送后未自动构建

确认 Cloudflare Pages 中关联的分支（Production branch）与实际推送分支一致。
