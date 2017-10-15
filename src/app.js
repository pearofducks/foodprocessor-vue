import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
  template: require('./app.html'),
  computed: mapGetters(['displayingRecipe', 'currentRecipeName'])
})
export default class App extends Vue {
  mounted() { this.$store.dispatch('getRecipes') }
}
