<template>
  <h2>My Cart</h2>
  <div>
    <h2>Cart Items</h2>
    <div v-for="cartItem of cartItems" :key="cartItem.id">
      <h5>
        product title: {{ cartItem.product.title }} , product quantity:
        {{ cartItem.quantity }} , product price: {{ cartItem.price }} ,
        <button @click="removeFromCart(cartItem._id)" class="btn btn-primary">
          Remove from cart
        </button>
      </h5>
    </div>
  </div>
  <h4>Total Cart Price: {{ cart.totalCartPrice }}</h4>
</template>

<script>
import axios from "axios";
export default {
  name: "CartView",
  data() {
    return {
      baseUrl: "http://localhost:8000/api/v1/",
      cart: {},
      cartItems: [],
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}cart`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.cart = res.data.data;
          this.cartItems = res.data.data.cartItems;
        })
        .catch((err) => console.log(err));
    },
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>
