<template>
  <div class="container py-5" v-show="role === 'admin'">
    <h2 class="mb-3 text-center fw-bold">Control Panel</h2>
    <ul class="list-unstyled">
      <li>
        <router-link to="/signin"> Signin </router-link>
      </li>
      <li>
        <router-link to="/signup"> Signup </router-link>
      </li>
      <li>
        <router-link to="/admin/categories"> Categories </router-link>
      </li>
      <li>
        <router-link to="/subcategories"> Subcategories </router-link>
      </li>
      <li>
        <router-link to="/brands"> Brands </router-link>
      </li>
      <li>
        <router-link to="/admin/products"> Products </router-link>
      </li>
      <li>
        <router-link to="/wishlist"> Wishlist </router-link>
      </li>
      <li>
        <router-link to="/coupons"> Coupons </router-link>
      </li>
      <li>
        <router-link to="/cart"> Cart </router-link>
      </li>
      <li>
        <router-link to="/orders"> Orders </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "AdminView",
  components: {},
  data() {
    return {
      baseURL: "http://localhost:8000/api/v1/",
      role: null,
    };
  },
  methods: {
    async getMyinfo() {
      await axios({
        method: "get",
        url: `${this.baseURL}users/getMe`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.role = res.data.data.role;
          console.log(res.data.data.role);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getMyinfo();
  },
};
</script>
<style scoped>
a {
  display: block;
  padding: 5px 10px;
  color: #ffffff;
  background-color: hsl(204, 100%, 51%);
  margin-bottom: 5px;
  border-radius: 10px;
  font-size: 20px;
  width: 50%;
  text-align: center;
  margin: 0 auto 10px;
  border: 1px solid hsl(204, 100%, 51%);
}
a:hover {
  background-color: #fff;
  color: hsl(204, 100%, 51%);
}
</style>
