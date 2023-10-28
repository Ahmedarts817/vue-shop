<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Products</h3>
      </div>
      <router-link :to="{ name: 'addProduct' }">
        <a class="btn btn-success">Add Product</a>
      </router-link>
    </div>
    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-lg-4 p-2 m-2 card"
      >
        <div><img :src="product.imageCover" alt="" class="card-img-top" /></div>

        <div class="card-body">
          <h5>{{ product.title }}</h5>
          <p>{{ product.description }}</p>
          <router-link
            v-show="$route.name === 'products'"
            :to="{ name: 'productDetails', params: { id: product._id } }"
          >
            <button class="btn btn-primary">product Details</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "ProductsView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
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
