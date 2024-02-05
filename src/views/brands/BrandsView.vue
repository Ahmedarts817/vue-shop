<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Brands</h3>
      </div>
      <router-link :to="{ name: 'addBrand' }">
        <a class="btn btn-success mb-3">Add Brand</a>
      </router-link>
    </div>
    <div class="row">
      <div v-for="brand of brands" :key="brand.id" class="col-md-4 col-lg-3">
        <div class="p-3 bg-white">
          <img :src="brand.image" alt="" class="img-fluid" />
        </div>
        <div class="text-center mt-2">
          <router-link
            v-show="$route.name === 'brands'"
            :to="{ name: 'brandDetails', params: { id: brand._id } }"
          >
            <button class="btn btn-primary">brand Details</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "BrandsView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      brands: null,
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}brands`)
        .then((res) => (this.brands = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
