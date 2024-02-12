<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ categories }}
    {{ products }}
  </div>
</template>
<script>
import categoriesMixin from "@/mixins/categoriesMixin.js";
import productsMixin from "@/mixins/productsMixin.js";
export default {
  name: "AboutView",
  mixins: [categoriesMixin, productsMixin],
};
</script>
