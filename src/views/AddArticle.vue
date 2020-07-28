<template>
  <div class="hello">
    <form style="display: grid;">
      Article Name:
      <input style="flex: 1" type="text" v-model="ArticleName" />
      <br />
      <vue-editor
        style="width: 100%; margin-bottom: 10px; height: 500px; overflow: scroll"
        v-model="ArticleText"
      ></vue-editor>
      <div style="flex: 1; margin-left: auto">
        <button @click="addArticle">ADD</button>
        <button click>CANCEL</button>
      </div>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "AddArticle",
  data() {
    return {
      ArticleName: "",
      ArticleText: "",
    };
  },
  components: { VueEditor },
  methods: {
    //{"affectedRows":1,"insertId":10,"warningStatus":0}
    addArticle: function (e) {
      console.log("Adding new article");
      e.preventDefault();
      const url = "https://localhost:8001/api/articles";
      const bearer = this.$store.getters.userJWTToken;

      fetch(url, {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ArticleName: this.ArticleName,
          ArticleText: this.ArticleText,
        }),
      })
        .then((response) => {
          console.log("Converting data to json");
          return response.json(response);
        })
        .then((response) => {
          console.log("Converted response: " + JSON.stringify(response));
          if (response.warningStatus != 0) {
            console.log("DB error");
          } else {
            console.log("DB success.  New articleid = " + response.insertId);
            this.$store.commit("setUpdate", 1);
            this.$router.push({
              name: "ViewArticle",
              params: {
                ArticleID: Number(response.insertId),
                edit: Boolean(false),
                add: 1,
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
