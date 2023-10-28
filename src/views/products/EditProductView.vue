<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Edit Product</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="" enctype="multipart/form-data">
          <div class="form-group">
            <label for="">Product Name</label>
            <input
              v-model="title"
              type="text"
              name=""
              id=""
              class="form-control"
              :placeholder="product.title"
            />
          </div>
          <div class="form-group">
            <label for="">Product Description</label>
            <input
              v-model="description"
              type="text"
              name=""
              id=""
              class="form-control"
              :placeholder="product.description"
            />
          </div>
          <div class="form-group">
            <label for="">Product Quantity</label>
            <input
              v-model="quantity"
              type="text"
              name=""
              id=""
              class="form-control"
              :placeholder="product.quantity"
            />
          </div>
          <div class="form-group">
            <label for="">Product Price</label>
            <input
              v-model="price"
              type="text"
              name=""
              id=""
              class="form-control"
              :placeholder="product.price"
            />
          </div>
          <div class="form-group">
            <label for="">Product Image Cover</label>
            <input
              type="file"
              ref="file"
              v-on:change="selectFile"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">Category</label>
            <select name="" id="" class="form-control" v-model="category">
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
            @click="editProduct"
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
  name: "EditProduct",
  data() {
    return {
      title: "",
      description: "",
      imageCover: "",
      quantity: null,
      price: null,
      categories: "",
      category: "",
      product: "",
      baseURL: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      axios
        .get(`${this.baseURL}categories`)
        .then((res) => (this.categories = res.data.data))
        .catch((err) => console.log(err));
    },
    async fetchProductData() {
      await axios
        .get(`${this.baseURL}products/${this.$route.params.id}`)
        .then((res) => (this.product = res.data.data))
        .catch((err) => console.log(err));
    },
    selectFile() {
      this.imageCover = this.$refs.file.files[0];
    },
    async editProduct() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("quantity", this.quantity);
      formData.append("price", this.price);
      formData.append("imageCover", this.imageCover);
      formData.append("category", this.category);
      await axios({
        method: "put",
        url: `${this.baseURL}products/${this.$route.params.id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.$router.push("/products");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchData();
    this.fetchProductData();
  },
};
</script>
