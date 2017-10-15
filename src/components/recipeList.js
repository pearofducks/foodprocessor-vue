import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  template: require('./recipeList.html')
})
export default class RecipeList extends Vue {
  mounted() { this.$store.commit('clearCurrentRecipe') }
}
