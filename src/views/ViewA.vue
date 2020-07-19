<template>
  <div class="hello" style="text-align: center">
    Hello from ViewA
    <br /><br >
    <button @click="getData">Get Data</button>

  </div>
</template>

<script>
import axios from "axios"
//import HelloWorld from "@/components/HelloWorld"

export default {
  name: 'ViewA',
  data() {
    return {
      content: ''
    } 
  },
  components: {
    //HelloWorld
  },
  props: {
  },
  mounted() {
  },
  methods : {
    getData: function() {
axios.get(`https://api.scryfall.com/cards/named?exact=anaba%20bodyguard`)
            .then((res) => {
                console.log(JSON.stringify(res));
            })
            .catch((err) => {
                if (err.response) {
                    console.log("Response: " + JSON.stringify(err.response))
                }
                console.log("Error: " + err)
            }) 
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
