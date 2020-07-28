<template>
  <!-- Navigation -->
  <header style="margin: 0 0 10px 0; font-size: 11pt;">
    <!-- Top Header Bar -->
    <div style="display: flex; height: 30px; margin: 0 0 20px 0; background-color: #fff">
      <!-- LOGO -->
      <div style="padding: 5px 0 0 20px; font-size: 18pt; margin-left: 10px; color: #ccc">
        <router-link to="/articles" style="color: #aaa">Article Database</router-link>
      </div>

      <!-- login / logout / greeting -->
      <div style="margin-left: auto; padding: 10px 10px 0px 0px; color: #aaa">
        <div v-if="this.$store.getters.userJWTToken == ''">
          <router-link :to="{ name: 'Login' }">Login</router-link>
          <span style="color: black; padding:5px">or</span>
          <router-link :to="{ name: 'CreateAccount' }">Create an Account</router-link>
        </div>
        <div v-else>
          Hello, {{ this.$store.getters.UserName }} |
          <a href="/" @click="logout">logout</a>
        </div>
      </div>
    </div>

    <!-- Menu Links  -->
    <div
      v-if="$route.path != '/viewb'"
      style="display: flex; justify-content: center; height: 20px; padding-top:
      5px; font-family: helvetica; margin: 0 0 50px 0; text-align: center; border-bottom: 10px solid #ccc"
    >
      <router-link
        :to="{
          name: 'ViewArticle',
          params: { ArticleID: 0, edit: false },
        }"
        style="margin-right: 30px"
      >View Articles</router-link>
      <router-link :to="{ name: 'ViewA' }" style="margin-right: 30px">View A</router-link>
      <router-link :to="{ name: 'ViewB' }" style="margin-right: 30px">View B</router-link>
      <router-link
        :to="{ name: 'ViewC', params: {product: 'hello'} }"
        style="margin-right: 30px"
      >View C</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopNav",
  methods: {
    logout: function (e) {
      e.preventDefault();
      this.$store.commit("setUserJWT", "");
    },
  },
  components: {},
};
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
  text-decoration: none;
  color: #50a050;
}
</style>
