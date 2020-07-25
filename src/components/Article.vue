<template>
  <div class="hello" style="font-family: helvetica;">
    <!-- EDIT link -->
    <div v-if="!this.edit && this.ArticleID != 0">
      <router-link
        :to="{
          name: 'ViewArticle',
          params: {
            ArticleID: Article.ArticleID,
            edit: true,
          },
        }"
        style="float: right"
        >[EDIT]</router-link
      >

      <button
        @click="deleteArticle(Article.ArticleID)"
        style="color: green;
        background-color:white; border: none"
      >
        [DEL]
      </button>
    </div>
    <!-- Editable View -->
    <div v-if="this.edit">
      <form style="margin: 20px; height: 600px; display: grid;">
        Article Name:
        <input
          style="flex: 1;"
          type="text"
          v-model="ArticleUpdate.ArticleName"
        /><br />
        <vue-editor
          style="flex: 1; margin-bottom: 10px; height: 500px; overflow: scroll"
          v-model="ArticleUpdate.ArticleText"
        ></vue-editor>
        <button style="xfloat: right;" @click="updateArticle">SAVE</button>
        <button style="xfloat: right;" @click="cancelEdit">CANCEL</button>
      </form>
    </div>

    <!-- Read only view -->
    <div v-else style="margin: 10px">
      <div v-if="this.ArticleID != 0">
        {{ Article.ArticleName }}<br />
        <hr style="border: 1px solid #ddd" />
        <div
          style="height: 500px; overflow: scroll"
          v-html="ArticleUpdate.ArticleText"
        ></div>
      </div>
      <div v-else>
        Please select an article to the left
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleX",
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
    if (this.ArticleID <= 0) this.ArticleID = this.$store.getters.ArticleID;
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
      const url = "https://localhost:8001/api/articles/" + this.ArticleID;
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
      const url = "https://localhost:8001/api/articles";
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
              },
            });
          }
        })
        .catch((err) => console.log("Error retrieving data: " + err));
    },

    deleteArticle: function(ArticleID) {
      if (!confirm("Delete article?")) return;
      console.log("Deleting article with ID " + ArticleID);

      const url = "https://localhost:8001/api/articles";
      const bearer = this.$store.getters.userJWTToken;

      fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ArticleID: ArticleID,
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
            // this.Articles.splice(
            //   this.Articles.findIndex((A) => (A.ArticleID = ArticleID)) - 1,
            //   1
            // );
            // this.$emit("updatenow");
            this.$store.commit("setUpdate", 1);
            this.$router.push({
              name: "ViewArticle",
              params: {
                ArticleID: 0,
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
