<template>
  <div class="container">
    <h1 class="mb-5">Coupon Details</h1>

    <div>
      <h3>{{ coupon.name }}</h3>
      <h5>coupon name : {{ coupon.name }}</h5>
      <h5>coupon expiry date : {{ coupon.expire }}</h5>
      <h5>coupon dicount amount : {{ coupon.discount }}</h5>
      <router-link
        :to="{ name: 'editCoupon', params: { id: this.$route.params.id } }"
        ><a class="m-4 btn btn-success" href="">Edit</a></router-link
      >
      <button @click="deleteCoupon" class="m-4 btn btn-success" href="">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CouponDetailsView",
  data() {
    return {
      coupon: "",
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}coupons/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.coupon = res.data.data))
        .catch((err) => console.log(err));
    },
    async deleteCoupon() {
      await axios({
        method: "delete",
        url: `${this.baseUrl}coupons/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(
          setTimeout(() => {
            this.fetchData();
            this.$router.push("/coupons");
          }, 1)
        )
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
