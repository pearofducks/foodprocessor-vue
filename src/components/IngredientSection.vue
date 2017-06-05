<template>
    <div class="ingredientSectionBlock">
      <h4>{{header}}</h4>
      <template v-for="(value,key) in content">
        <Ingredient :amount-data="value" :title-data="key"></Ingredient>
      </template>
    </div>
</template>

<script>
import Ingredient from './Ingredient.vue'

export default {
  props: ['header','content'],
  components: { Ingredient }
}
</script>

<style lang="scss">
  .ingredientSectionBlock .ingredient { border-left: 1px solid #ddd; margin-left: 2px; }
  .ingredientSectionBlock { margin: 1.5rem 0; }
</style>
