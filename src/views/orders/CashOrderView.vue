<template>
  <h1>Cash Order</h1>
  <div class="form-group">
    <label for="">Shipping Address</label>
    <input
      v-model="shippingAddress"
      type="text"
      name=""
      id=""
      class="form-control"
    />
  </div>
  <button @click="cashOrder" class="btn btn-primary">Create Cash Order</button>
</template>

<script>
import axios from "axios";
export default {
  name: "CashOrderView",
  data() {
    return {
      shippingAddress: "",
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async cashOrder() {
      await axios({
        method: "post",
        url: `${this.baseUrl}orders/${this.$route.params.id}`,
        data: {
          shippingAddress: this.shippingAddress,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          console.log(this.$route.params.cartId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
