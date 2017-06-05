<template> <Layout/> </template>

<script>
import Layout from './components/Layout.vue'

export default {
  components: { Layout },
  mounted() { this.$store.dispatch('getRecipes') }
}
</script>
