<template>
  <div id="app" class="container">
    <nav class="header">
      <h1 v-if="displayingRecipe"><router-link to="/">honneffer | food</router-link></h1>
      <h1 v-else>honneffer | food</h1>
      <h2>{{ currentRecipeName }}</h2>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  watch: {
    currentRecipeName: function() {
      let title = this.currentRecipeName ? this.currentRecipeName : "recipes"
      document.title = `h|f - ${title}`
    }
  },
  computed: mapGetters(['displayingRecipe', 'currentRecipeName'])
}
</script>

<style lang="scss">
* { padding: 0; margin: 0; box-sizing: border-box; }
html { font-size: 62.5%; }
html, body { height: 100%; font-weight: 300; font-style: normal; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; -webkit-text-size-adjust: 100%; }
h1, h2, h3, h4, h5 { color: #333; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif}
h1 { font-size: 2rem; font-weight: 500; text-transform: uppercase; }
h2 { font-size: 2rem; font-weight: 300; }
h3 { font-size: 2rem; font-weight: 600; text-transform: uppercase; margin: 2rem 0; }
h4 { font-size: 1.5rem; text-transform: uppercase; font-weight: 500; margin: 1rem 0; }
h5 { font-size: 1.5rem; }
a { color: inherit; text-decoration: none; }
a:hover { color: #333; color: transparent; text-shadow: 0 0 #333, .08em 0 0 #fff, 0 0, -.08em 0 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff; text-shadow: 0 0 #333, .08em 0 0 #fff, 0 0, -.08em 0 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff; background: -webkit-linear-gradient(#bbb, #bbb) center 1.09em no-repeat; background: linear-gradient(#bbb, #bbb) center 1.09em no-repeat; background-size: 98% 1px; }
.header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid #eee; padding: 2.5rem 0; margin-bottom: 2.5rem;}
.container { width: 75%; margin: 0 auto; padding-bottom: 3rem; }

@media only screen and (max-device-width: 480px) {
  html { font-size: 40%; }
  body { width: 100%; }
  .container { width: 90%; }
  .howBlock { font-size: 1.7rem; }
  .howTextBlock ul, .howTextBlock ol { margin-left: 5rem; }
}
</style>
