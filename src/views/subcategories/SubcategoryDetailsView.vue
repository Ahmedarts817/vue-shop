<template>
  <h1>Subcategory Details</h1>

  <div>
    <h3>{{ subcategory.name }}</h3>
    <router-link
      :to="{ name: 'editSubcategory', params: { id: this.$route.params.id } }"
      ><a class="m-4 btn btn-success" href="">Edit</a></router-link
    >
    <button @click="deleteSubategory" class="m-4 btn btn-success" href="">
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
      subcategory: {},
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}subcategories/${this.$route.params.id}`)
        .then((res) => (this.subcategory = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteSubategory() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}subcategories/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/subcategories");
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
