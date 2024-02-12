<template>
  <div class="container py-5 d-flex justify-content-center">
    <form
      class="mt-5 bg-main p-5 rounded shadowed"
      action=""
      enctype="multipart/form-data"
    >
      <h1 class="text-center">Sign in</h1>
      <div class="form-group mb-1">
        <label for="">Email</label>
        <input
          v-model="email"
          type="email"
          name=""
          id=""
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="">password</label>
        <input
          v-model="password"
          type="password"
          name=""
          id=""
          class="form-control"
        />
      </div>

      <input
        @click="signin"
        type="button"
        value="Log in"
        class="btn btn-primary mt-3 d-block mx-auto"
      />

      <p class="mt-4">
        Have not you an account? <router-link to="/signup">Sign up</router-link>
      </p>
    </form>
  </div>
  <ErrorView :error="error" :closeError="closeError" v-show="error" />
</template>
<script>
import axios from "axios";
import ErrorView from "@/components/ErrorView.vue";
export default {
  name: "SignIn",
  components: { ErrorView },
  data() {
    return {
      email: "",
      password: "",
      url: "http://localhost:8000/api/v1/",
      error: null,
    };
  },
  methods: {
    async signin() {
      await axios
        .post(`${this.url}auth/signin`, {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          console.log(result.data.token);
          localStorage.setItem("token", result.data.token);
          this.$router.replace("/");
          this.$emit("getMyInfo");
        })
        .catch((err) => {
          this.error = err.message;
          console.log(err);
        });
    },
    closeError() {
      this.error = null;
    },
  },
  emits: ["getMyInfo"],
};
</script>
