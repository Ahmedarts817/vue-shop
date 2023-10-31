<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Edit Coupon</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="">
          <div class="form-group">
            <label for="">Coupon Name</label>
            <input
              v-model="name"
              type="text"
              name=""
              id=""
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">Expiry Date</label>
            <input
              v-model="expire"
              type="date"
              name=""
              id=""
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">Discount Amount</label>
            <input
              v-model="discount"
              type="number"
              name=""
              id=""
              class="form-control"
            />
          </div>

          <input
            @click="editCoupon"
            type="button"
            value="Submit"
            class="btn btn-primary my-3"
          />
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "AddCoupon",
  data() {
    return {
      name: "",
      expire: "",
      discount: "",
      baseURL: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async editCoupon() {
      await axios({
        method: "put",
        url: `${this.baseURL}coupons/${this.$route.params.id}`,
        data: { name: this.name, expire: this.expire, discount: this.discount },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.$router.push("/coupons");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
