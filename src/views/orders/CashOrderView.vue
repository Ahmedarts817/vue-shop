<template>
  <div class="container">
    <div class="form w-50 mx-auto my-5">
      <h1 class="mb-5">Cash Order</h1>
      <div class="form-group">
        <label for="">Shipping Address</label>
        <input
          v-model="shippingAddress"
          type="text"
          name=""
          id=""
          class="form-control"
        />
        <div class="buttons d-flex justify-content-center gap-3 mt-3">
          <button @click="cashOrder" class="btn btn-primary">
            Create Cash Order
          </button>
          <button @click="createCheckout" class="btn btn-primary">
            Create CheckOut Session
          </button>
        </div>
      </div>
    </div>
  </div>
  <ErrorView :error="error" :closeError="closeError" v-show="error" />
</template>

<script>
import axios from "axios";
import ErrorView from "@/components/ErrorView.vue";

export default {
  name: "CashOrderView",
  components: { ErrorView },
  data() {
    return {
      shippingAddress: "",
      baseUrl: "http://localhost:8000/api/v1/",
      session: {},
      error: null,
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
          this.$router.push("/coupons");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async createCheckout() {
      await axios({
        method: "get",
        url: `${this.baseUrl}orders/checkout-session/${this.$route.params.id}`,
        data: {
          shippingAddress: this.shippingAddress,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          this.session = res.data.data.url;
          window.open(res.data.data.url);
        })
        .catch((err) => {
          console.log(err);
          this.error = err.message;
        });
    },
    closeError() {
      this.error = null;
    },
  },
};
</script>
