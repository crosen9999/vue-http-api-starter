<template>
  <div class="hello">
    Hello from Articles
    <br />
    <div v-for="Article in Articles" :key="Article.ArticleID">
        <router-link :to="{name: 'Article', params: {'ArticleID': Article.ArticleID}}">{{Article.ArticleName}}</router-link>
    </div>
    <br />
    <router-view :key="$route.path"></router-view>
    <button @click="x()">Show result</button>
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
            getArticles: function() {
                console.log("Getting data");
                const url = "http://localhost:8001/articles"

                fetch(url)
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
