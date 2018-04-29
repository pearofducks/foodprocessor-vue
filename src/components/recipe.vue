<template>
  <div class="recipeBlock">
    <div class="whatBlock">
      <h3>what</h3>
      <template v-for="(value, key) in what">
        <Ingredient v-if="typeof(value) === 'string'" :amount-data="value" :title-data="key" :key="key"/>
        <IngredientSection v-else :header="key" :content="value" :key="key"/>
      </template>
    </div>
    <div class="howBlock">
      <h3>how</h3>
      <div class="howTextBlock" v-html="how"/>
    </div>
  </div>
</template>

<script>
import Ingredient from './ingredient.vue'
import IngredientSection from './ingredientSection.vue'
import marked from 'marked'

export default {
  name: 'recipe',
  components: { Ingredient, IngredientSection },
  computed: {
    what() {
      return this._state.currentRecipeData ? this._state.currentRecipeData.what : ''
    },
    how() {
      return this._state.currentRecipeData ? marked(this._state.currentRecipeData.how) : ''
    }
  }
}
</script>
