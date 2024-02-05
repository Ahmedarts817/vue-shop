<template>
  <div class="container">
    <h1 class="my-3 text-center">Order Details</h1>

    <div class="bg-light px-5 py-3">
      <h3>Order</h3>
      <div
        v-for="item of order.cartItems"
        :key="item._id"
        class="border-1 text-white p-2 bg-light"
      >
        <div class="item bg-white text-black d-flex align-items-center px-5">
          <p class="w-25">{{ item.product.title }}</p>
          <img :src="item.product.imageCover" alt="" width="150" />
        </div>
      </div>
      <p>user name : {{ user.name }}</p>
      <p>user email : {{ user.email }}</p>
      <p>total price : {{ order.totalOrderPrice }}</p>
      <p>payment Method Type : {{ order.paymentMethodType }}</p>
      <button
        v-if="!delivered"
        @click="updateToDelivered"
        class="btn btn-primary mt-3 me-3"
      >
        Update to Delivered
      </button>
      <button v-if="delivered" class="btn btn-success mt-3 me-3">
        Delivered
      </button>
      <button v-if="!paid" @click="updateToPaid" class="btn btn-primary mt-3">
        Update to Paid
      </button>
      <button v-if="paid" class="btn btn-success mt-3">Paid</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "OrderDetailsView",
  data() {
    return {
      baseUrl: "http://localhost:8000/api/v1/",
      order: {},
      user: "",
      paid: false,
      delivered: false,
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}orders/${this.$route.params.id}/pay`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.order = res.data.data;
          this.user = res.data.data.user;
          this.delivered = res.data.data.isDelivered;
          this.paid = res.data.data.isPaid;
        })
        .catch((err) => console.log(err));
    },
    async updateToDelivered() {
      await axios({
        method: "put",
        url: `${this.baseUrl}orders/${this.$route.params.id}/deliver`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
    async updateToPaid() {
      await axios({
        method: "put",
        url: `${this.baseUrl}orders/${this.$route.params.id}/pay`,
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
