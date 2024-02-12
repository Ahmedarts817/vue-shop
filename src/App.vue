<template>
  <NavBar :userName="userName" :userRole="userRole" />
  <router-view @getMyInfo="getMyinfo" />
  <FooterView />
</template>
<script>
import NavBar from "./components/NavBar.vue";
import FooterView from "./components/FooterView.vue";
import axios from "axios";
export default {
  name: "App",
  components: { NavBar, FooterView },
  data() {
    return {
      baseURL: "http://localhost:8000/api/v1/",
      userName: null,
      userRole: null,
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
          this.userName = res.data.data.name.toUpperCase();
          this.userRole = res.data.data.role;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getMyinfo();
  },
};
</script>
<style>
* {
  box-sizing: border-box;
  transition: 0.3s;
}
body {
  font-family: Tahoma, sans-serif;
  background-color: #e8e8e8;
  position: relative;
  min-height: 100vh;
  padding-bottom: 300px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
router-view {
  min-height: 100vh;
}
.bg-main {
  background-color: #feee00;
}
.shadowed {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
