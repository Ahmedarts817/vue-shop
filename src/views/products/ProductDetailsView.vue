<template>
  <h1>Product details</h1>
  <h3>{{ product.title }}</h3>
  <img :src="product.imageCover" alt="" width="500" />
</template>
<script>
import axios from "axios";

export default {
  name: "ProductDetails",
  data() {
    return {
      product: {},
      url: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.url}products/${this.$route.params.id}`)
        .then((res) => (this.product = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
