<template>
  <h2>My Cart</h2>
  <div>
    <p>{{ cartId }}</p>
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
    <button class="btn btn-primary">
      Cash Checkout {{ cart._id }}
    </button></router-link
  >
</template>

<script>
import axios from "axios";
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>
