<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Subcategories</h3>
      </div>
      <router-link :to="{ name: 'addSubcategory' }">
        <a class="btn btn-success">Add Subcategory</a>
      </router-link>
    </div>
    <div class="row">
      <div
        v-for="subcategory of subcategories"
        :key="subcategory.id"
        class="col-md-6 col-lg-4 p-2 m-2 card"
      >
        <h5>{{ subcategory.name }}</h5>
        <p>{{ subcategory.category.name }}</p>
        <router-link
          v-show="$route.name === 'subcategories'"
          :to="{ name: 'subategoryDetails', params: { id: subcategory._id } }"
        >
          <button class="btn btn-primary">subcategory Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "SubcategoriesView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      subcategories: null,
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}subcategories`)
        .then((res) => (this.subcategories = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
