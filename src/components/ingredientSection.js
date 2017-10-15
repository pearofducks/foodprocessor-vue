import Vue from 'vue'
import Component from 'vue-class-component'
import Ingredient from './ingredient.js'

@Component({
  props: ['header','content'],
  components: { Ingredient },
  template: require('./ingredientSection.html')
})
export default class IngredientSection extends Vue { }
