<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/">
        <a class="navbar-brand brand fw-bold position-relative">Noon</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
          <li class="nav-item" v-bind:hidden="name">
            <router-link to="/signin"
              ><a class="nav-link" href="">Login</a></router-link
            >
          </li>
          <li class="nav-item" v-show="name">
            <a @click="logOut" class="nav-link" href="">Logout</a>
          </li>
          <li class="nav-item">
            <router-link to="/wishlist"
              ><a class="nav-link" href="">Wishlist</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart"
              ><a class="nav-link" href="">Cart</a>
            </router-link>
          </li>
          <li class="nav-item" v-show="role === 'admin'">
            <router-link to="/admin"
              ><a class="nav-link" href="">Admin</a>
            </router-link>
          </li>
          <li class="nav-item" v-show="name">
            <p class="nav-link" href="">Hi {{ name }}</p>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      baseURL: "http://localhost:8000/api/v1/",
      name: null,
      role: null,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    async getMyinfo() {
      await axios({
        method: "get",
        url: `${this.baseURL}users/getMe`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          this.name = res.data.data.name.toUpperCase();
          this.role = res.data.data.role;
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
nav {
  background-color: #feee00;
}
.brand::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1px;
  border-style: solid;
  border-width: 2px;
  border-color: #000 transparent #000 transparent;
  border-radius: 50%;
  background-color: #9f9c9c21;
  z-index: 0;
}
</style>
