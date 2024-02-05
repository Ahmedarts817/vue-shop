const axios = require("axios");

export default (await import("vue")).defineComponent({
  name: "WishlistView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      products: null,
      addedToWishlist: true,
      addedToCart: false,
    };
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some((item) => this.product_id == item.product.id);
    },
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}wishlist`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.products = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteFromWishlist(productId) {
      await axios({
        method: "delete",
        url: `${this.baseUrl}wishlist/${productId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.products = res.data.data;
          this.fetchData();
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
});
