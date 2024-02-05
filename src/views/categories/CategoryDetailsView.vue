<template>
  <div class="container">
    <h1>category Details</h1>
    <div>
      <h3>{{ category.name }}</h3>
      <div><img :src="category.image" alt="image" width="400" /></div>
    </div>
    <div class="top-products py-5 container">
      <h2 class="text-center my-4">Category Products</h2>
      <div class="row">
        <div
          v-for="product of products"
          :key="product.id"
          class="col-md-6 col-lg-4 col-xl-3 p-2 mb-2"
        >
          <ProductBox :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "@/components/product/ProductBox.vue";

export default {
  name: "CategoryDetailsView",
  components: { ProductBox },
  data() {
    return {
      category: {},
      baseUrl: "http://localhost:8000/api/v1/",
      products: null,
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}categories/${this.$route.params.id}`)
        .then((res) => (this.category = res.data.data))
        .catch((err) => console.log(err));
      await axios
        .get(`${this.baseUrl}categories/${this.$route.params.id}/products`)
        .then((res) => {
          this.products = res.data.data;
        })
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
        .catch((err) => {
          console.log(err);

          window.alert("you are not authorized");
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
