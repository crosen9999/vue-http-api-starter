<template>
  <div class="hello" style="text-align: center">
    Hello from ViewA
    <br /><br />
    <router-link :to="{ name: 'ViewA1' }" style="margin-right: 30px">
      Go to View A1
      <br />
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld"

export default {
  name: "ViewA",
  data() {
    return {
      content: "",
    };
  },
  components: {
    //HelloWorld
  },
  props: {},
  mounted() {},
  methods: {},
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
