<template>
  <div class="row align-items-center">
    <div class="col-lg-6 text-center">
      <div class="image p-5">
        <img class="w-50 d-block mx-auto" :src="product.imageCover" alt="" />
        <button
          @click="removeFromCart(cartItem._id)"
          class="btn btn-primary mt-3"
        >
          Remove from cart
        </button>
      </div>
    </div>
    <div class="col-lg-6">
      <p>product title: {{ cartItem.product.title }}</p>
      <p>product price: {{ cartItem.price }}</p>
      <p>
        product quantity:
        <input
          class="number"
          v-model="quantity"
          type="number"
          :placeholder="cartItem.quantity"
        />
        <button @click="updateItemQuantity(cartItem._id)" class="btn">
          update
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CartItemComponent",
  props: ["cartItem", "fetchData"],
  data() {
    return {
      quantity: null,
      baseUrl: "http://localhost:8000/api/v1/",
      product: "",
    };
  },
  methods: {
    async removeFromCart(itemId) {
      await axios({
        method: "delete",
        url: `${this.baseUrl}cart/${itemId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
    async updateItemQuantity(itemId) {
      await axios({
        method: "put",
        url: `${this.baseUrl}cart/${itemId}`,
        data: { quantity: this.quantity },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
    async fetchProductData() {
      await axios
        .get(`${this.baseUrl}products/${this.cartItem.product._id}`)
        .then((res) => {
          console.log("hi");
          this.product = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchProductData();
  },
};
</script>
<style scoped>
.row {
  border-bottom: 1px solid #222222;
}
input[type="number"] {
  width: 35px;
  border: none;
  background-color: transparent;
  color: #000;
}
</style>
