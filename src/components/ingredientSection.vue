<template>
  <div class="ingredientSectionBlock">
    <h4>{{header}}</h4>
    <Ingredient v-for="(value,key) in content" :key="key" :amount-data="value" :title-data="key"/>
  </div>
</template>

<script>
import Ingredient from './ingredient.vue'

export default {
  name: 'ingredientSection',
  props: ['header', 'content'],
  components: { Ingredient }
}
</script>
