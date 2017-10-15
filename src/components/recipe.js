import Vue from 'vue'
import Component from 'vue-class-component'
import Ingredient from './ingredient.js'
import IngredientSection from './ingredientSection.js'

@Component({
  components: { Ingredient, IngredientSection },
  template: require('./recipe.html')
})
export default class Recipe extends Vue {
  get what() {
    return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.what
      : ''
  }
  get how() {
    return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.how
      : ''
  }
}
