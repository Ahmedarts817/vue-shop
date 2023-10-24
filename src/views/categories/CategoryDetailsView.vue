<template>
  <h1>category Details</h1>

  <div>
    <h3>{{ category.name }}</h3>
    <div><img :src="category.image" alt="image" width="400" /></div>
    <router-link
      :to="{ name: 'EditCategory', params: { id: this.$route.params.id } }"
      ><a class="m-4 btn btn-success" href="">Edit</a></router-link
    >
    <button @click="deleteCategory" class="m-4 btn btn-success" href="">
      Delete
    </button>
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
    async deleteCategory() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}categories/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/categories");
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
