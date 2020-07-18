<template>
  <div id="app">
    <!-- Navigation -->
    <header>
      <div style="width: auto; height: 30px; background-color: #aaa; border: 1px #a8f solid; top: 0; left: 0; margin: 0 0 10px 0;">
      </div>
      <div style="margin: 20px; padding: 20px; background-color: #eee">
        <router-link :to="{name: 'ViewArticles'}">
          View Articles
        </router-link>
        <router-link :to="{name: 'ViewA'}"> 
          View A
        </router-link>
        <router-link :to="{name: 'Login'}" v-if="this.$store.getters.userJWTToken == ''"> 
          Login
        </router-link>
        <span v-else>
          <a href="/" @click="logout">logout</a>
        </span>
      </div>
    </header>

    <!-- MAIN CONTENT: top level view -->
    <div>
      <router-view />
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    logout: function (e) {
      e.preventDefault();
      this.$store.commit('setUserJWT', "");
    },
  },
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
  margin-top: 0px;
}
</style>
