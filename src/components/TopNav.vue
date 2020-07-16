<template>
      <header>

      <router-link :to="{name: 'Home'}">
        Home
      </router-link>

      <router-link :to="{name: 'ViewA'}"> 
        View A
      </router-link>

      <button v-if="this.$store.getters.userJWTToken != ''" @click="logout">Logout</button>

    </header>
</template>

<script>
export default {
    name: "TopNav",
    methods: {
      logout: function () {
        this.$store.commit('setUserJWT', "");
      },
    }
};
</script>

<style>

</style>