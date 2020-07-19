<template>
  <div>

    <!-- Navigation -->
      <TopNav />

    <!-- MAIN CONTENT: top level view -->
      <router-view></router-view>

  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue"

export default {
  name: 'App',
  methods: {
    logout: function (e) {
      e.preventDefault();
      this.$store.commit('setUserJWT', "");
    },
  },
  components: {
    TopNav
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
