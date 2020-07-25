<template>
  <section>
    <div style="margin:auto; width: 50%; border: 1px solid">
      <button style="width: 100%" @click="toggleNav">Toggle Nav</button>
    </div>
    <div id="tags">
      <div class="tag" style="background-color: #c0b2c0;">A</div>
      <div class="tag" style="background-color: #b2c0c0;">B</div>
      <div class="tag" style="background-color: #c0b2c0;">C</div>
      <div class="tag" style="background-color: #c0c0b2;">D</div>
      <div class="tag" style="background-color: #c0b2c0;">E</div>
    </div>
    <div id="options">
      <div class="options-left">
        <input type-text style="width: 98%" />
      </div>
      <div class="options-middle"></div>
      <div class="options-right">
        <button>Recent</button><button>Hot</button>
      </div>
    </div>
    <div id="main">
      <div class="left">
        Articles
      </div>
      <div class="middle">
        Article
      </div>
      <div class="right">
        Recent
      </div>
    </div>
  </section>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld"

export default {
  name: "ViewB",
  props: {},
  data() {
    return {};
  },
  components: {
    //HelloWorld
  },
  computed: {},
  methods: {
    toggleNav: function(e) {
      e.preventDefault();
      this.$store.commit("setNoNav", !this.$store.getters.noNav);
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  margin-top: 75px;
}

div {
  padding: 5px;
}

button {
  width: 50%;
}

.options-left {
  flex: 25%;
  margin-left: 5px;
}

.options-middle {
  flex: 50%;
  margin: 0 5px 0 5px;
}

.options-right {
  flex: 25%;
  margin-right: 5px;
}

.left {
  flex: 25%;
  height: 500px;
  background: #eee;
  margin-left: 5px;
}

.middle {
  flex: 50%;
  margin: 0 5px 0 5px;
}

.right {
  flex: 25%;
  background: #eee;
  margin-right: 5px;
}

#options {
  display: flex;
}

#main div {
  border: 1px solid gray;
}

#main {
  display: flex;
}

#tags {
  display: flex;
  justify-content: center;
}

.tag {
  font-size: 12pt;
  text-align: center;
  width: 75px;
  height: 10px;
  margin: 0 5px 0 0;
  box-shadow: 2px 5px #c0c0c0;
}
</style>
