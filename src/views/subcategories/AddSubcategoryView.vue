<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Add Subategory</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="">
          <div class="form-group">
            <label for="">Subategory Name</label>
            <input
              v-model="name"
              type="text"
              name=""
              id=""
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">category</label>
            <select v-model="category" name="" id="" class="form-control">
              <option
                v-for="category of categories"
                :key="category.id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <input
            @click="addCategory"
            type="button"
            value="Submit"
            class="btn btn-primary my-3"
          />
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "AddCategory",
  data() {
    return {
      name: "",
      category: "",
      categories: null,
      baseURL: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseURL}categories`)
        .then((res) => (this.categories = res.data.data))
        .catch((err) => console.log(err));
    },
    async addCategory() {
      await axios({
        method: "post",
        url: `${this.baseURL}subcategories`,
        data: { name: this.name, category: this.category },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.$router.push("/subcategories");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
