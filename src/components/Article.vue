<template>
  <div class="hello">
    <br />
        Hello from Article
        <br />
        {{ArticleText}}
    <br />
  </div>
</template>

<script>

    export default {
        name: "Article",
        props: {
            ArticleText: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                }
        },
        mounted() {
        },
        methods: {
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
