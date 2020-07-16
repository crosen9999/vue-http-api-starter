<template>

  <div class="hello">
    <br />
        Hello from Article
        <router-link :to="{
                  name: 'ViewArticle', 
                  params: {
                    'ArticleID': Article.ArticleID,
                    'edit': true
                    }
                    }">[EDIT]</router-link>
        <br />
      <div v-if="this.edit">
          Editing article id {{Article.ArticleID}}<br>
          <form>
            Article Name: <input type=text v-model="ArticleUpdate.ArticleName"><br>
            Article Text: <textarea rows="20" cols="30" v-model="ArticleUpdate.ArticleText"></textarea><br>
            <button @click="saveArticle">SAVE</button>
          </form>
      </div>
      <div v-else>
        {{ArticleID}}<br />
        {{Article.ArticleText}}
      </div>
  </div>

</template>

<script>

    export default {
      name: "Article",
      data() {
            return {
                Article: {},
                ArticleUpdate: {}
                }
        },
      props: {
          ArticleID: {
            type: Number,
            required: true
          },
          edit: {
            type: Boolean,
            required: true
          }
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
        getArticle: function() {
            console.log("Getting data for: " + this.ArticleID);
            const url = "https://localhost:8001/api/article?articleid=" + this.ArticleID;
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
                    this.Article.ArticleText = "";
                } else
                {
                    console.log("ArticleText found: " + data[0].ArticleText);
                    this.Article = data[0];
                    this.ArticleUpdate = this.Article;
                }
            })
            .catch( err => console.log("Error retrieving data: " + err));
          },
        saveArticle: function(e) {
            this.$emit("updatenow");
            e.preventDefault();
            console.log("Saving data for: " + this.ArticleID);
            const url = "https://localhost:8001/api/article" 
            const bearer = this.$store.getters.userJWTToken;

            fetch(
                  url, {
                  method: 'POST',
                  headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                    },
                  body: JSON.stringify({
                            ArticleID: this.Article.ArticleID,
                            ArticleName: this.ArticleUpdate.ArticleName,
                            ArticleText: this.ArticleUpdate.ArticleText
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
                    this.$router.push({
                                  name: 'ViewArticle',
                                  params: {
                                    'ArticleID': Number(this.Article.ArticleID),
                                    'edit': Boolean(false)
                                    }
                    })
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
