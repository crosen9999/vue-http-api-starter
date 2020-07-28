<template>
  <div>
    <button @click="selectTag({ id: 1 }, { id: 10, title: 'hello' })">now</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProducts: [{ id: 1 }, { id: 2 }],
    };
  },
  params: { product: { type: String, required: true } },
  methods: {},
  components: {},
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.element {
  border: 1px solid;
  flex: 1;
}

.two {
}
</style>
