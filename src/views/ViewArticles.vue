<template>
  <section class="hello">
    <!-- Articles -->
    <div v-if="this.$store.getters.userJWTToken != ''" style="display: flex; text-align: left">
      <!-- Articles List -->
      <div
        class="article-list"
        style="border: 0px solid #ccc; margin: 0 20px 0 10px; width: 300px; xheight: 600px; xoverflow-y: scroll"
      >
        <div style>
          <router-link
            :to="{
              name: 'AddArticle',
              params: {
                edit: true,
              },
            }"
          >[ADD]</router-link>
        </div>
        <div>
          <articles style="width: 250px"></articles>
        </div>
      </div>

      <!-- Article Selected -->
      <div
        class="article-selection"
        style="width: 700px; border: 1px solid #eee; margin-right: 10px"
      >
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
    <div v-else style="text-align: center">Please log in to view articles.</div>
  </section>
</template>

<script>
import Articles from "@/components/Articles";

export default {
  components: {
    Articles,
  },
  created() {
    //alert("ViewB")
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
