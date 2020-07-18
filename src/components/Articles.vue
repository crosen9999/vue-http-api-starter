<template>
  <div class="article-container" style="width: 500px; height 700px;">
    <div v-for="Article in Articles" :key="Article.ArticleID">
        <button @click="deleteArticle(Article.ArticleID)">DEL </button>
        <router-link :to="{name: 'ViewArticle', params: {
                                  'ArticleID': Article.ArticleID,
                                  'edit': false
                                  }}">
                                  {{Article.ArticleName}}</router-link>
    </div>
  </div>
</template>

<script>

    export default {
        name: "Articles",
        data() {
            return {
                Articles: []
                }
        },
        mounted() {
            this.getArticles();
        },
        methods: {

          updateNow: function () {},


          deleteArticle: function (ArticleID) {
            console.log("Deleting article with ID " + ArticleID);
            const url = "https://localhost:8001/api/article" 
            const bearer = this.$store.getters.userJWTToken;

            fetch(
                  url, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                    },
                  body: JSON.stringify({
                            ArticleID: ArticleID
                            })
                  }
            )
            .then( (response) => {
                console.log("Converting data to json");
                return response.json();
            })            
            .then( (response) => {
                console.log("Converted response: " + response)
                if (response != 0) {
                    console.log("DB error: " + response);
                } else
                {
                    console.log("DB success");
                    this.$emit("updatenow");
                    this.$router.push({
                                  name: 'ViewArticle',
                                  params: {
                                    'ArticleID':1
                                    }
                    })
                }
            })
            .catch( err => console.log("Error retrieving data: " + err));
          },

      getArticles: function() {
          console.log("Getting data");
          const url = "https://localhost:8001/api/articles";
          const bearer = this.$store.getters.userJWTToken;
          fetch(
                url, {
                method: 'GET',
                headers: {
                  'Authorization': bearer
                  }
                }
          )
          .then( (response) => {
              console.log("Converting data to json");
              return response.json();
          })
          .then( (data) => {
              if (typeof(data[0].ArticleID)=="undefined") {
                  console.log("No data found.");
              } else
              {
                  console.log("Data found");
                  this.Articles = data;
              }
          })
          .catch( err => console.log("Error retrieving data: " + err));
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
