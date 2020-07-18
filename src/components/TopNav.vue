<template>

    <!-- Navigation -->
    <header style="margin: 0 0 10px 0; font-size: 11pt;">

        <div style="display: flex; width: 100%; height: 30px; margin: 0 0 20px 0; background-color: #ccc">

          <div style="padding: 5px 0 0 20px; font-size: 18pt; margin-left: 10px">Article Database</div>

          <div style="margin-left: auto; padding: 10px 10px 0px 0px">
            <router-link :to="{name: 'Login'}" v-if="this.$store.getters.userJWTToken == ''"> 
              Login
            </router-link>
            <div v-else>
              <a href="/" @click="logout">logout</a>
            </div>
          </div>
        </div>

      <div style="display: flex; justify-content: center; height: 50px; font-family: helvetica; margin: 0 0 50px 0; text-align: center">
        <router-link :to="{name: 'ViewArticles'}" style="margin-right: 30px">
          View Articles
        </router-link>
        <router-link :to="{name: 'ViewA'}" style="margin-right: 30px"> 
          View A
        </router-link>
      </div>        

    </header>

</template>

<script>

export default {
  name: 'TopNav',
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

a {
  text-decoration: none
}
</style>
