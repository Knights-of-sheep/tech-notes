# Tech Notes

使用 **VitePress + GitHub + Cloudflare Pages** 构建的个人技术笔记站点。

## 技术栈

| 环节 | 技术 | 作用 |
| ---- | ---- | ---- |
| 静态站点 | [VitePress](https://vitepress.dev) | Markdown 驱动的站点生成器 |
| 源码托管 | [GitHub](https://github.com) | 版本管理与 CI 触发 |
| 部署托管 | [Cloudflare Pages](https://pages.cloudflare.com) | 全球 CDN + 自动构建部署 |

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

### 4. Cloudflare Pages 部署

1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**。
2. 点击 **Connect to Git**，授权并选择 GitHub 仓库。
3. 构建配置：

| 配置项 | 值 |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run docs:build` |
| Build output directory | `.vitepress/dist` |

4. （推荐）在 **Environment variables** 添加 `NODE_VERSION = 20`。
5. 点击 **Save and Deploy**，等待构建完成，即可获得 `https://<项目名>.pages.dev` 访问地址。

之后每次 `git push` 到 `main` 分支都会自动触发重新构建与部署。

## 站点内文档

- 首页：`index.md`
- 快速开始：`guide/getting-started.md`
- 部署教程：`guide/deploy.md`
- 关于：`about.md`

## License

ISC
