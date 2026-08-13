import DefaultTheme from 'vitepress/theme'
import LatestPosts from './LatestPosts.vue'
import CategoryCards from './CategoryCards.vue'
import CategoryPosts from './CategoryPosts.vue'
import TagsFilter from './TagsFilter.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LatestPosts', LatestPosts)
    app.component('CategoryCards', CategoryCards)
    app.component('CategoryPosts', CategoryPosts)
    app.component('TagsFilter', TagsFilter)
  }
}
