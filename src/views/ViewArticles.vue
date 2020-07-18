<template>
  <div class="hello">
  
    <!-- Articles -->
    <div v-if="this.$store.getters.userJWTToken != ''" style="text-align: left">

        <!-- Articles List -->
        <div class="article-list" style="border: 1px solid; float: left">
          <div>
            <router-link :to="{
                      name: 'AddArticle', 
                      params: {
                        'edit': true
                        }
                        }">[ADD]</router-link>
            <br />
          </div>    
          <div >
                    <articles style="width: 250px"></articles>
          </div>
        </div>

        <!-- Article Selected -->
        <div class="article-selection" style="float: left; max-width: 700px; margin-left: 20px; border: 1px solid;">
          <router-view :key="$route.fullPath"></router-view>
        </div>

    </div>
    <div v-else>      
      User is not logged in.  Not showing Articles
    </div>

  </div>
</template>

<script>
    import Articles from "@/components/Articles"

    export default {
      components: {
          Articles
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
