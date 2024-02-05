<template>
  <div>
    <img :src="product.imageCover" alt="" class="card-img-top" />
  </div>

  <div class="card-body">
    <h5>{{ product.title }}</h5>
    <p>{{ product.description }}</p>
    <router-link :to="{ name: 'productDetails', params: { id: product._id } }">
      <button class="btn btn-primary">product Details</button>
    </router-link>
    <router-link
      :to="{ name: 'editProduct', params: { id: this.product._id } }"
      v-show="$route.name === 'adminproducts'"
      ><a class="m-4 btn btn-primary" href="">Edit</a></router-link
    >
    <button
      @click="deleteProduct"
      class="m-4 btn btn-primary"
      href=""
      v-show="$route.name === 'adminproducts'"
    >
      Delete
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductBox",
  props: ["product"],
  data() {
    return {};
  },

  methods: {
    async deleteProduct() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}products/${this.product._id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.$router.push("/products");
          }, 1)
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>
