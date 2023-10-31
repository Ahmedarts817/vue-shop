<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Coupons</h3>
      </div>
      <router-link :to="{ name: 'addCoupon' }">
        <a class="btn btn-success">Add Coupon</a>
      </router-link>
    </div>
    <div class="row">
      <div
        v-for="coupon of coupons"
        :key="coupon.id"
        class="col-md-6 col-lg-4 p-2 m-2 card"
      >
        <h5>{{ coupon.name }}</h5>
        <router-link
          v-show="$route.name === 'coupons'"
          :to="{ name: 'couponDetails', params: { id: coupon._id } }"
        >
          <button class="btn btn-primary">Coupon Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "CouponsView",

  data() {
    return {
      // baseUrl: "https://udemy-eshopp-app.onrender.com/api/v1/",
      baseUrl: "http://localhost:8000/api/v1/",
      coupons: null,
    };
  },
  methods: {
    async fetchData() {
      await axios({
        method: "get",
        url: `${this.baseUrl}coupons`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => (this.coupons = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
