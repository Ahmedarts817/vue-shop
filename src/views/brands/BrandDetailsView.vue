<template>
  <h1 class="mb-5">Brand Details</h1>

  <div>
    <h3>{{ brand.name }}</h3>
    <div><img :src="brand.image" width="400" alt="" /></div>

    <router-link
      :to="{ name: 'editBrand', params: { id: this.$route.params.id } }"
      ><a class="m-4 btn btn-success" href="">Edit</a></router-link
    >
    <button @click="deleteBrand" class="m-4 btn btn-success" href="">
      Delete
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BrandDetailsView",
  data() {
    return {
      brand: {},
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}brands/${this.$route.params.id}`)
        .then((res) => (this.brand = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteBrand() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}brands/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/brands");
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
