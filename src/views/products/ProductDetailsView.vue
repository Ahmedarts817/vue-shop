<template>
  <h1 class="mb-5">Product Details</h1>

  <div>
    <h3>{{ product.name }}</h3>
    <div><img :src="product.imageCover" width="400" alt="" /></div>

    <router-link
      :to="{ name: 'editProduct', params: { id: this.$route.params.id } }"
      ><a class="m-4 btn btn-success" href="">Edit</a></router-link
    >
    <button @click="deleteProduct" class="m-4 btn btn-success" href="">
      Delete
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      product: {},
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}products/${this.$route.params.id}`)
        .then((res) => (this.product = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteProduct() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}products/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/products");
          }, 1)
        )
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
