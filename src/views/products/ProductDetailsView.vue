<template>
  <h1 class="mb-5">Product Details</h1>

  <div>
    <h3>{{ product.name }}</h3>
    <div><img :src="product.imageCover" width="400" alt="" /></div>

    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade w-50 mx-auto"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="images[0]" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="images[1]" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="images[2]" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <router-link
      :to="{ name: 'editProduct', params: { id: this.$route.params.id } }"
      ><a class="m-4 btn btn-success" href="">Edit</a></router-link
    >
    <button @click="deleteProduct" class="m-4 btn btn-success" href="">
      Delete
    </button>
    <button
      v-if="!itemIsInWishlist && !addedToWishlist"
      @click="addToWishlist"
      class="m-4 btn btn-success"
    >
      Add to wishlist
    </button>
    <button
      v-if="addedToWishlist && itemIsInWishlist"
      class="m-4 btn btn-success"
    >
      Added to wishlist successfuly
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      product: "",
      baseUrl: "http://localhost:8000/api/v1/",
      images: "",
      wishlistItems: [],
      addedToWishlist: false,
    };
  },
  computed: {
    itemIsInWishlist() {
      return this.wishlistItems.some((item) => this.product._id == item._id);
    },
  },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseUrl}products/${this.$route.params.id}`)
        .then((res) => {
          this.product = res.data.data;
          this.images = res.data.data.images;
        })
        .catch((err) => console.log(err));
      await axios({
        method: "get",
        url: `${this.baseUrl}wishlist`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.wishlistItems = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteProduct() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}products/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/products");
          }, 1)
        )
        .catch((err) => console.log(err));
    },
    async addToWishlist() {
      axios({
        method: "post",
        url: `${this.baseUrl}wishlist`,
        data: { productId: this.$route.params.id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.addedToWishlist = true;

          this.itemIsInWishlist = true;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
