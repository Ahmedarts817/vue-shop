<template>
  <h2>My Cart</h2>
  <p>{{ cart }}</p>
  <div>
    <h2>Cart Items</h2>
    <div v-for="cartItem of cartItems" :key="cartItem.id">
      <CartItemComponent :cartItem="cartItem" :fetchData="fetchData" />
    </div>
  </div>
  <h4>Total Cart Price: {{ cart.totalCartPrice }}</h4>
  <h4 v-if="cart.totalPriceAfterDiscount">
    Total Cart Price After Discount : {{ cart.totalPriceAfterDiscount }}
  </h4>
  <button @click="showCoupon" class="btn btn-primary">Apply Coupon</button>
  <div v-if="showCouponCondition">
    <div class="form-group">
      <label for="">Coupon name</label>
      <input v-model="coupon" type="text" name="" id="" class="form-control" />
    </div>
    <button @click="applyCoupon" class="btn btn-primary">Apply</button>
  </div>
  <router-link :to="{ name: 'cashOrder', params: { id: cartId } }">
    <button class="btn btn-primary">Create Order</button></router-link
  >
  <button @click="clearCart" class="btn btn-primary">Clear Cart</button>
</template>

<script>
import axios from "axios";
import CartItemComponent from "./CartItemComponent.vue";
export default {
  name: "CartView",
  data() {
    return {
      baseUrl: "http://localhost:8000/api/v1/",
      cart: {},
      cartId: {},
      cartItems: [],
      coupon: "",
      totalPriceAfterDiscount: "",
      showCouponCondition: false,
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
          this.cartId = res.data.data._id;
          this.cartItems = res.data.data.cartItems;
          this.totalPriceAfterDiscount = res.data.data.totalPriceAfterDiscount;
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
    async applyCoupon() {
      await axios({
        method: "put",
        url: `${this.baseUrl}cart/applyCoupon`,
        data: { coupon: this.coupon },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
          this.showCouponCondition = false;
        })
        .catch((err) => console.log(err));
    },
    showCoupon() {
      this.showCouponCondition = true;
    },
    async clearCart() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}cart`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.$router.push("/products");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
  components: { CartItemComponent },
};
</script>
