<template>
  <div class="container">
    <h1 class="my-3 text-center">All Orders</h1>

    <div
      v-for="order of orders"
      :key="order._id"
      class="bg-white rounded px-5 py-2 mb-3"
    >
      <h3>Order</h3>
      <p>user name : {{ order.user.name }}</p>
      <p>user email : {{ order.user.email }}</p>
      <p>total price : {{ order.totalOrderPrice }}</p>
      <p>payment Method Type : {{ order.paymentMethodType }}</p>
      <router-link
        :to="{
          name: 'orderDetails',
          params: { id: order._id },
        }"
        ><button class="btn btn-primary">Order Details</button></router-link
      >
    </div>
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
