<template>
  <div class="hello" style="font-family: helvetica">
    <router-link
      :to="{
        name: 'ViewArticle',
        params: {
          ArticleID: Article.ArticleID,
          edit: true,
        },
      }"
      style="float: right"
      v-if="!this.edit"
      >[EDIT]</router-link
    >
    <br />

    <div v-if="this.edit">
      <form style="margin: 20px; height: 600px">
        Article Name:
        <input
          style="width: 100%;"
          type="text"
          v-model="ArticleUpdate.ArticleName"
        /><br /><br />
        <vue-editor
          style="width: 100%; margin-bottom: 10px; height: 500px; overflow: scroll"
          v-model="ArticleUpdate.ArticleText"
        ></vue-editor>
        <button style="float: right;" @click="cancelEdit">CANCEL</button>
        <button style="float: right; margin-right: 10px" @click="updateArticle">
          SAVE
        </button>
      </form>
    </div>

    <div v-else style="margin: 10px">
      {{ Article.ArticleName }}<br />
      <hr style="border: 1px solid #ddd" />
      <div
        style="height: 500px; overflow: scroll"
        v-html="ArticleUpdate.ArticleText"
      ></div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "Article",
  data() {
    return {
      Article: {},
      ArticleUpdate: {},
    };
  },
  components: {
    VueEditor,
  },
  props: {
    ArticleID: {
      type: Number,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.getArticle();
  },
  // beforeRouteUpdate: (to, from ,next) =>{
  //   alert(from.name);
  //   alert(to.name);
  //   next();
  // },
  methods: {
    cancelEdit: function() {
      this.$router.push({
        name: "ViewArticle",
        params: {
          ArticleID: Number(this.Article.ArticleID),
          edit: Boolean(false),
        },
      });
    },

    getArticle: function() {
      console.log("Getting data for: " + this.ArticleID);
      const url =
        "https://localhost:8001/api/article?articleid=" + this.ArticleID;
      const bearer = this.$store.getters.userJWTToken;

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      })
        .then((response) => {
          console.log("Converting data to json");
          return response.json();
        })
        .then((data) => {
          if (typeof data[0].ArticleID == "undefined") {
            console.log("No data found.");
            this.Article.ArticleText = "";
          } else {
            console.log("Article found: " + data[0].ArticleName);
            this.Article = data[0];
            this.ArticleUpdate = this.Article;
          }
        })
        .catch((err) => console.log("Error retrieving data: " + err));
    },

    updateArticle: function(e) {
      e.preventDefault();
      console.log("Saving data for: " + this.ArticleID);
      const url = "https://localhost:8001/api/article";
      const bearer = this.$store.getters.userJWTToken;

      fetch(url, {
        method: "PUT",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ArticleID: this.Article.ArticleID,
          ArticleName: this.ArticleUpdate.ArticleName,
          ArticleText: this.ArticleUpdate.ArticleText,
        }),
      })
        .then((response) => {
          console.log("Converting data to json");
          return response.json();
        })
        .then((response) => {
          console.log("Converted response: " + response);
          if (response != 0) {
            console.log("DB error: " + response);
          } else {
            console.log("DB success");
            this.$store.commit("setUpdate", 1);
            //this.$emit("updatenow");
            this.$router.push({
              name: "ViewArticle",
              params: {
                ArticleID: Number(this.Article.ArticleID),
                edit: Boolean(false),
                refresh: 1,
              },
            });
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
