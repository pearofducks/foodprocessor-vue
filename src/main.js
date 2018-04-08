import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import marked from 'marked'
import App from './app.js'
import RecipeList from './components/recipeList.js'
import Recipe from './components/recipe.js'
import './style.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

const titlePrefix = "h|f"

function slugify(s) {
  return s.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

class RecipeStore {
  constructor(name, what, how) {
    this.name = name;
    this.what = what;
    this.how = marked(how.join("\n\n"));
  }
}

const state = { recipes: {}, currentRecipe: '' }
const mutations = {
  hydrate: (state) => {
    state.recipes = window.recipes
      .sort((a,b) => a.name.localeCompare(b.name))
      .reduce((accum, r) => {
        accum[slugify(r.name)] = new RecipeStore(r.name, r.what, r.how)
        return accum
      }, {})
  },
  setCurrentRecipe: (state, name) => state.currentRecipe = name,
  clearCurrentRecipe: (state) => { state.currentRecipe = '' }
}
const actions = {
}
const getters = {
  displayingRecipe: state => state.currentRecipe != '',
  currentRecipeData: state => state.recipes[state.currentRecipe],
  currentRecipeName: (state, getters) => getters.currentRecipeData ? getters.currentRecipeData.name : "",
}
const store = new Vuex.Store({ state, actions, mutations, getters })

store.commit('hydrate')

let router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/:recipe', component: Recipe },
    { path: '/', component: RecipeList },
    { path: '*', redirect: '/' }
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('setCurrentRecipe', to.params.recipe)
  let name = store.getters.currentRecipeName
  let title = name ? name : "recipes"
  document.title = `${titlePrefix} - ${title}`
  next()
})

new Vue({ router, store, render: h => h(App) }).$mount('#app')
