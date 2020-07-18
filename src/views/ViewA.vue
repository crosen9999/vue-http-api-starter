<template>
  <div class="hello" style="text-align: center">
    Hello from ViewA
    <br /><br >
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<script>

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
