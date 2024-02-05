<template>
  <div class="error" v-show="error">
    <h2>Error <span class="close" :onclick="closeError">X</span></h2>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "ErrorView",
  props: ["error", "closeError"],
};
</script>
<style scoped>
.error {
  background-color: #ff2222;
  padding: 10px;
  width: 300px;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error .close {
  position: absolute;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
