<template>
  <h1>Order Details</h1>

  <div>
    <h3>Order</h3>
    <div v-for="item of order.cartItems" :key="item._id">
      {{ item.product.title }}
      <img :src="item.mage" alt="" width="200" />
    </div>
    user name : {{ user.name }} user email : {{ user.email }} || total price :
    {{ order.totalOrderPrice }} || payment Method Type :
    {{ order.paymentMethodType }}
  </div>
  <button v-if="!delivered" @click="updateToDelivered" class="btn btn-primary">
    Update to Delivered
  </button>
  <button v-if="delivered" class="btn btn-success">Delivered</button>
  <button v-if="!paid" @click="updateToPaid" class="btn btn-primary">
    Update to Paid
  </button>
  <button v-if="paid" class="btn btn-success">Paid</button>
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
