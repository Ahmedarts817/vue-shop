<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Products</h3>
      </div>
      <!-- <router-link :to="{ name: 'AddCategory' }">
          <a class="btn">Add Category</a>
        </router-link> -->
    </div>
    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-lg-4 p-2 mb-2"
      >
        <ProductBox :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/products/ProductBox.vue";
const axios = require("axios");
export default {
  name: "ProductsView",
  components: { ProductBox },

  data() {
    return {
      //baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      categories: null,
      products: null,
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}products`)
        .then((res) => (this.products = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
