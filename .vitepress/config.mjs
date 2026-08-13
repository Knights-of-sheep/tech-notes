import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

const postsDir = path.resolve(process.cwd(), 'posts')

const categoryLabels = {
  frontend: '前端',
  backend: '后端',
  devops: 'DevOps',
  ai: 'AI',
  database: '数据库',
  site: '站点建设'
}

function readTitle(file) {
  const content = fs.readFileSync(file, 'utf-8')
  const m = content.match(/^---\r?\n[\s\S]*?title:\s*(.+?)\s*\r?\n/m)
  if (m) return m[1].replace(/^['"]|['"]$/g, '')
  return path.basename(file, '.md')
}

// 遍历 posts/ 目录自动生成侧边栏（按分类分组）
function postsSidebar() {
  const result = []
  let cats = []
  try {
    cats = fs.readdirSync(postsDir).filter((d) =>
      fs.statSync(path.join(postsDir, d)).isDirectory()
    )
  } catch {
    return result
  }
  for (const cat of cats.sort()) {
    const catDir = path.join(postsDir, cat)
    const items = fs.readdirSync(catDir)
      .filter((f) => f.endsWith('.md') && f !== 'index.md')
      .map((f) => ({
        text: readTitle(path.join(catDir, f)),
        link: `/posts/${cat}/${f.replace(/\.md$/, '')}`
      }))
    if (items.length) {
      result.push({
        text: categoryLabels[cat] || cat,
        collapsed: true,
        items
      })
    }
  }
  return result
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tech Notes',
  description: '我的技术笔记 — VitePress + GitHub + Cloudflare',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  // 仓库 README 只作为 GitHub 说明，不编译进站点
  srcExclude: ['README.md'],

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/posts/': postsSidebar(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Knights-of-sheep/tech-notes' },
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 Tech Notes',
    },

    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
  },
})
