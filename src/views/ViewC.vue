<template>
  <div>
    <div class="container">
      <div class="element one">Element 1</div>
      <div class="element two">Element 2</div>
      <div class="element three">Element 3</div>
    </div>
  </div>
</template>

<script>
export default {};
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
