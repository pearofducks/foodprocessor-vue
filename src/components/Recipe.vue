<template>
  <div class="recipeBlock">

    <div class="whatBlock">
      <h3>what</h3>
      <template v-for="(value,key) in what">
        <Ingredient v-if="typeof(value) === 'string'" :amount-data="value" :title-data="key"/>
        <IngredientSection v-else :header="key" :content="value"/>
      </template>
    </div>

    <div class="howBlock"><h3>how</h3><div class="howTextBlock" v-html="how"></div></div>

  </div>
</template>

<script>
import Ingredient from './Ingredient.vue'
import IngredientSection from './IngredientSection.vue'

export default {
  components: { Ingredient, IngredientSection },
  computed: {
    what() {
      return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.what
      : ''
    },
    how() {
      return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.how
      : ''
    }
  }
}
</script>

<style lang="scss">
.whatBlock, .howBlock { margin: 2.5rem 0; }
.howBlock { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 1.7rem; font-weight: 400; }
.howTextBlock { line-height: 160%;
  strong { font-weight: 600; }
  ol, ul { margin-left: 2rem; margin-bottom: 1.5rem; }
  p { margin-top: 1.5rem; margin-bottom: 0; }
  li { padding-left: 1.5rem; margin: 0.75rem 0; }
  ul & li, ul & ul, ol & ul, ul & ol, ol & ol { margin-top: 0; margin-bottom: 0; }
}
</style>
