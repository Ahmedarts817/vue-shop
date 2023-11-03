<template>
  <h1>All Orders</h1>

  <div v-for="order of orders" :key="order._id">
    <h3>Order</h3>
    user name : {{ order.user.name }} || user email : {{ order.user.email }} ||
    total price : {{ order.totalOrderPrice }} || payment Method Type :
    {{ order.paymentMethodType }}
    <router-link
      :to="{
        name: 'orderDetails',
        params: { id: order._id },
      }"
      ><button class="btn btn-primary">Order Details</button></router-link
    >

    <hr />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "OrdersView",
  data() {
    return {
      baseUrl: "http://localhost:8000/api/v1/",
      orders: [],
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}orders`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.orders = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
