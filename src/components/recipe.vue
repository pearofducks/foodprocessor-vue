<template>
  <div class="recipeBlock">
    <section class="whatBlock" aria-labelledby="whatLabel">
      <h3 id="whatLabel">what</h3>
      <template v-for="(value, key) in what">
        <IngredientSection v-if="Object(value) === value" :header="key" :content="value" :key="key"/>
        <Ingredient v-else :amount-data="value" :title-data="key" :key="key"/>
      </template>
    </section>
    <section class="howBlock" aria-labelledby="howLabel">
      <h3 id="howLabel">how</h3>
      <span class="howTextBlock" v-html="how"/>
    </section>
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
