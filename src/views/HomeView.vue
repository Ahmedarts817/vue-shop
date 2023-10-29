<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div>
      <ul class="list-unstyled">
        <li>
          <router-link to="/signin"><a href="">Signin</a></router-link>
        </li>
        <li>
          <router-link to="/signup"><a href="">Signup</a></router-link>
        </li>
        <li>
          <router-link to="/categories"><a href="">Categories</a></router-link>
        </li>
        <li>
          <router-link to="/subcategories"
            ><a href="">Subcategories</a></router-link
          >
        </li>
        <li>
          <router-link to="/brands"><a href="">Brands</a></router-link>
        </li>
        <li>
          <router-link to="/products"><a href="">Products</a></router-link>
        </li>
        <li>
          <router-link to="/wishlist"><a href="">Wishlist</a></router-link>
        </li>
        <li>
          <router-link to="/coupons"><a href="">Coupons</a></router-link>
        </li>
        <li>
          <router-link to="/cart"><a href="">Cart</a></router-link>
        </li>
        <li>
          <router-link to="/orders"><a href="">Orders</a></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },
};
</script>
