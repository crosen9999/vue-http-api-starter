<template>
  <div class="article-container" style="width: 500px; height 700px;">
    <div
      v-for="Article in Articles"
      :key="Article.ArticleID"
      style="border: 1px solid #ddd; height: 60px"
    >
      <router-link
        style="font-size: 10pt; word-break:break-all;"
        :to="{
          name: 'ViewArticle',
          params: {
            ArticleID: Article.ArticleID,
            edit: false,
          },
        }"
      >
        <div style="color: #42b983; font-weight: bold">
          {{ Article.ArticleName }}
        </div>
        <div style="color: #aaa">{{ articleSummary(Article.ArticleText) }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",

  data() {
    return {
      Articles: [],
    };
  },
  mounted() {
    //alert("articles mounted");
    this.getArticles();
  },
  computed: {
    update: function() {
      return this.$store.getters.update;
    },
  },
  watch: {
    update: function(val) {
      //alert("articles update: " + val);
      if (val == 1) {
        this.getArticles();
      }
    },
  },
  methods: {
    articleSummary: function(text) {
      return text.replace(/<[^>]+>/g, "").substring(0, 70);
    },

    updateNow: function() {},

    getArticles: function() {
      console.log("Articles.getArticles()********************");
      const url = "https://localhost:8001/api/articles";
      const bearer = this.$store.getters.userJWTToken;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      })
        .then((response) => {
          console.log("Received response.  Converting data to json");
          return response.json();
        })
        .then((data) => {
          if (typeof data[0].ArticleID == "undefined") {
            console.log("No ArticleID found in response.");
          } else {
            console.log("Data is valid,");
            this.Articles = data;
            this.$store.commit("setUpdate", 0);
            this.$store.commit("setArticleID", this.Articles[0].ArticleID);
          }
        })
        .catch((err) => console.log("Error retrieving data: " + err));
    },
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
