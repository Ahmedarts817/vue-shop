<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Categories</h3>
      </div>
      <!-- <router-link :to="{ name: 'AddCategory' }">
        <a class="btn">Add Category</a>
      </router-link> -->
    </div>
    <div class="row">
      <div
        v-for="category of categories"
        :key="category.id"
        class="col-md-6 col-lg-4 p-2 mb-2"
      >
        <CategoryBox :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from "@/components/category/CategoryBox.vue";
const axios = require("axios");
export default {
  name: "CategoriesView",
  components: { CategoryBox },

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      categories: null,
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}categories`)
        .then((res) => (this.categories = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
