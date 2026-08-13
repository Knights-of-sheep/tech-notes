# Tech Notes

使用 **VitePress + GitHub + Cloudflare** 构建的个人技术笔记站点。

## 技术栈

| 环节 | 技术 | 作用 |
| ---- | ---- | ---- |
| 静态站点 | [VitePress](https://vitepress.dev) | Markdown 驱动的站点生成器 |
| 源码托管 | [GitHub](https://github.com) | 版本管理与 CI 触发 |
| 部署托管 | [Cloudflare Workers & Pages](https://developers.cloudflare.com/pages/) | 全球 CDN + 自动构建部署 |

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发预览
npm run docs:dev

# 生产构建（产物输出到 .vitepress/dist）
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

## 完整实操教程

### 1. 本地初始化

```bash
mkdir tech-notes && cd tech-notes
npm init -y
npm install -D vitepress
```

在 `package.json` 中配置脚本：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

### 2. 目录结构

```text
tech-notes/
├── .vitepress/
│   └── config.mjs          # 站点配置（标题、导航、侧边栏等）
├── guide/                   # 文档内容
│   ├── getting-started.md
│   └── deploy.md
├── public/                  # 静态资源，原样复制到构建产物
│   └── logo.svg
├── index.md                 # 首页
├── about.md                 # 关于页
├── wrangler.toml            # Cloudflare 部署配置（指定产物目录）
├── package.json
├── .gitignore
└── README.md
```

### 3. 初始化 Git 并推送到 GitHub

```bash
git init
git add .
git commit -m "init: VitePress tech notes"

# 在 GitHub 新建空仓库 tech-notes（Public），然后：
git remote add origin https://github.com/<你的用户名>/tech-notes.git
git branch -M main
git push -u origin main
```

### 4. Cloudflare 部署

1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**。
2. 点击 **Connect to Git**，授权并选择 GitHub 仓库。
3. 构建配置：

| 配置项 | 值 |
| --- | --- |
| Build command（构建命令） | `npm run docs:build` |
| Deploy command（部署命令） | `npx wrangler deploy` |
| Production branch（生产分支） | `main` |

4. 确保仓库根目录存在 `wrangler.toml`（指定产物目录）：

```toml
name = "tech-notes"
compatibility_date = "2025-08-01"

[assets]
directory = ".vitepress/dist"
not_found_handling = "404-page"
```

> **关键**：这套 Workers + Assets 流程没有「Build output directory」面板项，产物目录由 `wrangler.toml` 的 `assets.directory` 决定。缺少它会导致报错 `assets.directory ... does not exist`。

5. 点击 **Save and Deploy**，等待构建完成，即可获得 `https://<项目名>.<子域>.workers.dev` 访问地址。

之后每次 `git push` 到 `main` 分支都会自动触发重新构建与部署。

## 站点内文档

- 首页：`index.md`
- 快速开始：`guide/getting-started.md`
- 部署教程：`guide/deploy.md`
- 关于：`about.md`

## License

ISC
