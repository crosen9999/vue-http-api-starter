<template>
  <div class="hello">
    Hello from Article View
    <br />
    <br />
  
    <div v-if="this.$store.getters.userJWTToken != ''">
      <article style="width: 1000px; background-color: gray"></articles>
    </div>
    <div v-else>      
      User is not logged in.  Not showing Articles
    </div>

  </div>
</template>

<script>
    import Article from "@/components/Article"

    export default {
      components: {
          Article
      },
      created() {
        //alert("ViewB")
      }
    }
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
