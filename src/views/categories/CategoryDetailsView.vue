<template>
  <h1>category Details</h1>

  <div>
    <h3>{{ category.name }}</h3>
    <img :src="category.image" alt="image" width="500" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryDetailsView",
  data() {
    return {
      category: {},
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}categories/${this.$route.params.id}`)
        .then((res) => (this.category = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
