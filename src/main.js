import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import RecipeList from './components/recipeList.vue'
import Recipe from './components/recipe.vue'
import './style.scss'

Vue.use(VueRouter)

const titlePrefix = 'h|f'

const slugify = (s) => s.toString()
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '')

const state = new Vue({
  data: () => ({
    recipes: window.recipes.sort((a, b) => a.name.localeCompare(b.name)).reduce((accum, r) => {
      accum[slugify(r.name)] = { name: r.name, what: r.what, how: r.how.join('\n\n') }
      return accum
    }, {}),
    currentRecipe: ''
  }),
  computed: {
    currentRecipeData() {
      return this.recipes[this.currentRecipe]
    },
    currentRecipeName() {
      return !!this.currentRecipe ? this.currentRecipeData.name : ''
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{ path: '/:recipe', component: Recipe }, { path: '/', component: RecipeList }, { path: '*', redirect: '/' }]
})

router.beforeEach((to, from, next) => {
  state.currentRecipe = to.params.recipe || ''
  const name = state.currentRecipeName
  const title = name ? name : 'recipes'
  document.title = `${titlePrefix} - ${title}`
  next()
})

Vue.prototype._state = state
new Vue({ router, render: h => h(App) }).$mount('#app')
