# 部署到 GitHub + Cloudflare

本页是完整的实操教程，带你从本地 VitePress 站点一路部署到 Cloudflare（Workers + Assets）。

## 整体流程

```text
本地开发 → git init → 推送到 GitHub → Cloudflare 关联仓库 → 自动构建部署 → 访问线上站点
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

## 第二步：添加 wrangler.toml 配置（关键）

Cloudflare 的 **Workers + Assets** 部署流程依赖仓库里的 `wrangler.toml`，用它指定构建产物目录。在项目根目录新建 `wrangler.toml`：

```toml
name = "tech-notes"
compatibility_date = "2025-08-01"

[assets]
directory = ".vitepress/dist"      # 指向 vitepress build 的产物目录
not_found_handling = "404-page"    # 找不到路径时回退到 VitePress 生成的 404.html
```

> **这是最容易踩的坑**。如果没有这个文件，Cloudflare 的 VitePress 预设会把产物目录默认为 `docs/.vitepress/dist`，导致部署时报错：
>
> ```
> The directory specified by the "assets.directory" field ... does not exist: .../docs/.vitepress/dist
> ```
>
> 解决办法就是补上这个 `wrangler.toml`，把 `assets.directory` 指向真实的 `.vitepress/dist`。

## 第三步：创建 GitHub 仓库并推送

1. 登录 [GitHub](https://github.com) → 点击右上角 **+** → **New repository**。
2. 填写仓库名（例如 `tech-notes`），选择 **Public**，**不要**勾选自动初始化 README。
3. 将本地仓库与远程关联并推送：

```bash
git remote add origin https://github.com/<你的用户名>/tech-notes.git
git branch -M main
git push -u origin main
```

## 第四步：Cloudflare 连接仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 左侧菜单进入 **Workers & Pages** → 点击 **Create application** → 选择 **Pages** 标签页。
3. 点击 **Connect to Git**，授权并选择你的 GitHub 账号与 `tech-notes` 仓库。
4. 点击 **Begin setup** 进入构建配置。

## 第五步：填写构建配置

| 配置项 | 值 |
| --- | --- |
| Build command（构建命令） | `npm run docs:build` |
| Deploy command（部署命令） | `npx wrangler deploy` |
| Production branch（生产分支） | `main` |

> **注意**：这套 Workers + Assets 流程**没有**「Build output directory」面板项，产物目录由仓库里的 `wrangler.toml` 的 `assets.directory` 决定（见第二步）。

## 第六步：部署与访问

1. 点击 **Save and Deploy**，Cloudflare 会依次执行：`npm install` → 构建命令 → 部署命令。
2. 构建完成后会分配一个形如 `https://<项目名>.<你的子域>.workers.dev` 的地址。
3. 此后每次 `git push` 到 `main` 分支，Cloudflare 都会自动重新构建部署。

## 可选：绑定自定义域名

在项目页面的 **Settings → Domains & Routes** 中添加自定义域名即可。

## 常见问题

### 报错 assets.directory 目录不存在

```
The directory specified by the "assets.directory" field ... does not exist: .../docs/.vitepress/dist
```

原因：仓库缺少 `wrangler.toml`，Cloudflare 预设默认用了 `docs/.vitepress/dist`。解决：在仓库根目录添加 `wrangler.toml`，把 `assets.directory` 指向 `.vitepress/dist`。

### 页面样式/资源 404

检查 `.vitepress/config.mjs` 中的 `base` 配置，部署在根域名时应为 `'/'`。

### 推送后未自动构建

确认 Cloudflare 中关联的生产分支与实际推送分支一致（通常为 `main`）。
