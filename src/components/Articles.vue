<template>
   
    <div class="article-container" style="border: 1px solid grey; background-color: #555; width: 800px; height 700px">

      <div class="article-list" style="width: 300px; height: 500px; float: left; border 1px solid">

        <router-link :to="{
                  name: 'AddArticle', 
                  params: {
                    'edit': true
                    }
                    }">[ADD]</router-link>
        <br />

        <div v-for="Article in Articles" :key="Article.ArticleID">
            <a href="" @click="deleteArticle">[DEL] | </a>
            <router-link :to="{name: 'ViewArticle', params: {
                                      'ArticleID': Article.ArticleID,
                                      'edit': false
                                      }}">
                                      {{Article.ArticleName}}</router-link>
        </div>
      </div>

      <div class="article-selection" style="border: 1px red solid; float: left; width: 500px">
        <router-view :key="$route.fullPath" v-on:updatenow="updateNow"></router-view>
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

            addArticle: function (e) {
              e.preventDefault();
            },

            deleteArticle: function () {

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
