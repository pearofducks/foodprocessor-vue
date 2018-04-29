<template>
  <div id="app" class="container">
    <nav class="header">
      <h1>
        <router-link to="/">honneffer | food</router-link>
      </h1>
      <h2>{{ _state.currentRecipeName }}</h2>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
