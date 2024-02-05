<template>
  <div class="home">
    <div class="categories-nav">
      <div class="container">
        <div class="row fw-bold">
          <div class="col-lg-4 p-0">
            <router-link to="/categories">
              <a class="text-primary" href="">All categories</a></router-link
            >
          </div>
          <div class="col-lg-8 p-0">
            <ul class="d-flex gap-2 align-items-center flex-wrap">
              <li><a href="">Eleectronics</a></li>
              <li><a href="">Mobiles</a></li>
              <li><a href="">Men</a></li>
              <li><a href="">Women</a></li>
              <li><a href="">Beauty & Health</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/01.avif" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="../assets/02.avif" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="../assets/03.avif" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="top-categories py-5 container">
      <h2 class="text-center my-4">Top Categories</h2>
      <div class="row">
        <div
          v-for="category of categories"
          :key="category.id"
          class="col-md-6 col-lg-4 col-xl-3 p-2 mb-2"
        >
          <CategoryBox :category="category" />
        </div>
      </div>
      <router-link to="/categories">
        <a
          class="text-center text-white bg-primary p-3 mx-auto rounded fs-3 w-25 d-block"
          href=""
          >All categories</a
        ></router-link
      >
    </div>
    <div class="top-products py-5 container">
      <h2 class="text-center my-4">Top Products</h2>
      <div class="row">
        <div
          v-for="product of products"
          :key="product.id"
          class="col-md-6 col-lg-4 col-xl-3 p-2 mb-2"
        >
          <ProductBox :product="product" />
        </div>
      </div>
      <router-link to="/products">
        <a
          class="text-center text-white bg-primary p-3 mx-auto rounded fs-3 w-25 d-block"
          href=""
          >All Products</a
        ></router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import CategoryBox from "@/components/category/CategoryBox.vue";
import ProductBox from "@/components/product/ProductBox.vue";
const axios = require("axios");
export default {
  name: "HomeView",
  components: { CategoryBox, ProductBox },

  data() {
    return {
      categories: null,
      products: null,
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}categories`)
        .then((res) => (this.categories = res.data.data))
        .catch((err) => console.log(err));
      await axios
        .get(`${this.baseUrl}products`)
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => console.log(err));
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.categories-nav a {
  display: block;
  color: #000000;
  padding: 10px;
}
.categories-nav a:hover {
  background-color: #fff;
  box-shadow: 15px 25px 36px -4px rgba(0, 0, 0, 0.1);
}
</style>
