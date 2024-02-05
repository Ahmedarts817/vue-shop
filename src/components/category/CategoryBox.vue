<template>
  <div class="card">
    <div>
      <img :src="category.image" class="card-img-top" alt="this is a pic" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ category.name }}</h5>

      <p class="card-text">{{ category.slug }}</p>
      <router-link
        :to="{ name: 'CategoryDetails', params: { id: category._id } }"
      >
        <button class="btn btn-primary">category Details</button>
      </router-link>
      <router-link
        v-show="$route.name === 'admincategories'"
        :to="{ name: 'EditCategory', params: { id: category._id } }"
        ><a class="m-4 btn btn-success" href="">Edit</a></router-link
      >
      <button
        v-show="$route.name === 'admincategories'"
        @click="deleteCategory"
        class="m-4 btn btn-success"
        href=""
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CategortBox",
  props: ["category"],
  data() {
    return {};
  },
  methods: {
    async deleteCategory() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}categories/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.$router.push("/categories");
          }, 1)
        )
        .catch((err) => {
          console.log(err);

          window.alert("you are not authorized");
        });
    },
  },
};
</script>
