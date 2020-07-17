<template>
  <div class="hello">

    Hello from Article Add
    <br /><br />

    <form>
        Article Name: <input type=text v-model="Article.ArticleName"><br>
        Article Text: <textarea rows="20" cols="30" v-model="Article.ArticleText"></textarea><br>
        <button @click="addArticle">ADD</button>
    </form>

  </div>
</template>

<script>

    export default {
      name: "AddArticle",
      data() {
            return {
                Article: {}
                }
        },        
      components: {

      },
      methods: {
        addArticle: function() {
            //alert("ViewB")
        }
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
