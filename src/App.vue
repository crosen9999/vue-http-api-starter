<template>
  <div id="app">
    <!-- Navigation -->
    <header>
      <router-link :to="{name: 'ViewArticles'}">
        View Articles
      </router-link>
      <router-link :to="{name: 'ViewA'}"> 
        View A
      </router-link>
      <button v-if="this.$store.getters.userJWTToken != ''" @click="logout">Logout</button>
      <button v-else @click="login">Login</button>
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
    logout: function () {
      this.$store.commit('setUserJWT', "");
    },
    login: function() {
      console.log("Getting data");
      const url = "https://localhost:8001/api/login";

      fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': ""              }
            })
      .then( (response) => {
          console.log("Converting data to json");
          return response.json();
      })
      .then( (data) => {
          if (typeof(data)=="undefined") {
              console.log("No data found.");
          } else
          {
              console.log(data);
              this.$store.commit('setUserJWT', "Bearer " + data);
          }
      })
      .catch( err => console.log("Error logging in: " + err));

    }
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
  margin-top: 60px;
}
</style>
