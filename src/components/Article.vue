<template>
  <div class="hello">
    <br />
        Hello from Article
        <br />
        {{ArticleID}}<br />
        {{Article.ArticleText}}
  </div>
</template>

<script>

    export default {
      name: "Article",
        data() {
            return {
                Article: {}
                }
        },
      props: {
          ArticleID: {
            type: Number,
            required: true
          }
      },
      mounted() {
        this.getArticle();
      },
      methods: {
        getArticle: function() {
            console.log("Getting data for: " + this.ArticleID);
            const url = "https://localhost:8001/article?articleid=" + this.ArticleID;
            const bearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoiam9obiJ9LCJpYXQiOjE1OTQ3NDQxNTJ9.KoYZcSflr3y41L2mwW7Z6O0tEKm01bpZTB6y8tuW4n4"

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
                    console.log("ArticleText found: " + data.ArticleText);
                    this.Article = data[0];
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
