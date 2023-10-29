<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>My Wishlist</h3>
      </div>
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
          <p>{{ product._id }}</p>

          <button
            v-show="addedToWishlist"
            v-on:click="deleteFromWishlist(product._id)"
            class="m-4 btn btn-success"
            href=""
          >
            Delete from wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "WishlistView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      products: null,
      addedToWishlist: true,
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}wishlist`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.products = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteFromWishlist(productId) {
      await axios({
        method: "delete",
        url: `${this.baseUrl}wishlist/${productId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.products = res.data.data;
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
