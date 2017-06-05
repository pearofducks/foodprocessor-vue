import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import marked from 'marked'
import App from './App.vue'
import RecipeList from './components/RecipeList.vue'
import Recipe from './components/Recipe.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

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
  hydrate: (state, json) => {
    let hydrated = {}
    json
      .sort((a,b) => a.name.localeCompare(b.name))
      .forEach( r => hydrated[slugify(r.name)] = new RecipeStore(r.name, r.what, r.how))
    state.recipes = hydrated
  },
  setCurrentRecipe: (state, name) => state.currentRecipe = name,
  clearCurrentRecipe: (state) => { state.currentRecipe = '' }
}
const actions = {
  setCurrentRecipe: ({ commit }, name) => { commit('setCurrentRecipe', name) },
  getRecipes ({ commit, state }) {
    if (Object.keys(state.recipes).length != 0) { return }
    fetch('/static/recipes.js')
      .then(response => response.json())
      .then(json => commit('hydrate', json))
      .catch(err => console.error(err))
  }
}
const getters = {
  displayingRecipe: state => state.currentRecipe != '',
  currentRecipeData: state => state.recipes[state.currentRecipe],
  currentRecipeName: (state, getters) => getters.currentRecipeData ? getters.currentRecipeData.name : "",
}
const store = new Vuex.Store({ state, actions, mutations, getters })

let router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/:recipe', component: Recipe },
    { path: '/', component: RecipeList },
    { path: '*', redirect: '/' }
  ]
})
new Vue({ router, store, render: h => h(App) }).$mount('#app')
