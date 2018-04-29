<template>
  <div class="recipeListBlock">
    <ul>
      <li v-for="(r, slug) in this.$store.state.recipes" :key="slug">
        <h2><router-link :to="slug">{{ r.name }}</router-link></h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('clearCurrentRecipe')
  }
}
</script>
