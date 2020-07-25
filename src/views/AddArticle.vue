<template>
  <div class="hello">
    Hello from Article Add
    <br /><br />

    <form>
      Article Name: <input type="text" v-model="ArticleName" /><br />
      Article Text:
      <textarea rows="20" cols="30" v-model="ArticleText"></textarea><br />
      <button @click="addArticle">ADD</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data() {
    return {
      ArticleName: "",
      ArticleText: "",
    };
  },
  components: {},
  methods: {
    //{"affectedRows":1,"insertId":10,"warningStatus":0}
    addArticle: function(e) {
      console.log("Adding new article");
      e.preventDefault();
      const url = "https://localhost:8001/api/article";
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
