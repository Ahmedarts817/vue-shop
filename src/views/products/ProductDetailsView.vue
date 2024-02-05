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

    <!-- wishlist buttons  -->
    <button
      v-if="!itemIsInWishlist && !addedToWishlist"
      @click="addToWishlist"
      class="m-4 btn btn-primary"
    >
      Add to wishlist
    </button>
    <button v-if="addedToWishlist" class="m-4 btn btn-success">
      Added to wishlist successfuly
    </button>
    <button v-if="itemIsInWishlist" class="m-4 btn btn-success">
      Item is already in wishlist
    </button>

    <!-- cart buttons  -->
    <button
      v-if="!itemIsInCart && !addedToCart"
      @click="addToCart"
      class="m-4 btn btn-primary"
    >
      Add to Cart
    </button>
    <button v-if="addedToCart" class="m-4 btn btn-success">
      Added to cart successfuly
    </button>
    <button v-if="itemIsInCart" class="m-4 btn btn-success">
      Item is already in cart
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
      cartItems: [],
      addedToWishlist: false,
      addedToCart: false,
    };
  },
  computed: {
    itemIsInWishlist() {
      return this.wishlistItems.some((item) => this.product._id == item._id);
    },
    itemIsInCart() {
      return this.cartItems.some((item) => this.product._id == item.product.id);
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
      await axios({
        method: "get",
        url: `${this.baseUrl}cart`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.cartItems = res.data.data.cartItems))
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
          setTimeout(() => {
            this.$router.push("/products");
          }, 1500);
        })
        .catch((err) => console.log(err));
    },
    async addToCart() {
      axios({
        method: "post",
        url: `${this.baseUrl}cart`,
        data: { productId: this.$route.params.id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.addedToCart = true;
          setTimeout(() => {
            this.$router.push("/products");
          }, 1500);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
