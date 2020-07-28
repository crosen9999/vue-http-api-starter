<template>
  <div class="hello" style="text-align: center">
    <div @click="newText('Volume')">Click Here</div>
    <router-link :to="{ name: 'ViewA1' }" style="margin-right: 30px">
      Go to View A1
      <br />
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld"
import { mapState } from "vuex";

export default {
  name: "ViewA",
  data() {
    return {
      content: "hello",
      text: "abc",
    };
  },
  computed: mapState(["UserName"]),
  components: {
    //HelloWorld
  },
  props: {},
  mounted() {},
  methods: {
    go: function(argT) {
      alert(argT);
      console.log("text", argT);
    },
    newText: function(argT) {
      const text = argT;
      this.text = text;
      console.log("text", argT);
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
