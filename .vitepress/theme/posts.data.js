import { createContentLoader } from 'vitepress'

function extractCategory(url) {
  const u = url.replace(/\.html$/, '')
  const parts = u.split('/').filter(Boolean)
  // /posts/frontend/xxx -> ['posts', 'frontend', 'xxx']
  return parts[0] === 'posts' && parts.length >= 2 ? parts[1] : ''
}

function isIndexPage(url) {
  const u = url.replace(/\.html$/, '')
  return u.endsWith('/') || u.endsWith('/index')
}

export default createContentLoader('posts/**/*.md', {
  transform(raw) {
    return raw
      .filter((p) => !isIndexPage(p.url))
      .map((p) => ({
        url: p.url,
        title: p.frontmatter.title || '',
        date: p.frontmatter.date || '',
        tags: p.frontmatter.tags || [],
        description: p.frontmatter.description || '',
        category: extractCategory(p.url)
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
