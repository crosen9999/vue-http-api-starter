<template>
  <div id="app">

    <router-link :to="{name: 'ViewA'}"> 
       View A
    </router-link>
    <router-link :to="{name: 'ViewB'}"> |
      View B
    </router-link>

    <router-view />

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
