<template>
  <div class="hello">
    <!-- user logged in -->
    <div v-if="this.$store.getters.userJWTToken != ''">
      <article-zoom :ArticleID="ArticleID"></article-zoom>
    </div>

    <!-- user not logged in -->
    <div v-else>
      User is not logged in. Not showing Articles.
    </div>
  </div>
</template>

<script>
import ArticleZoom from "@/components/ArticleZoom";

export default {
  props: {
    ArticleID: {
      type: Number,
      required: true,
    },
  },
  components: {
    ArticleZoom,
  },
  created() {
    this.$store.commit("setNoNav", true);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
