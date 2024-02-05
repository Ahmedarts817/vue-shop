<template>
  <div class="container py-5 d-flex justify-content-center align-items-center">
    <form
      class="mt-5 bg-main p-5 rounded shadowed"
      action=""
      enctype="multipart/form-data"
    >
      <h1 class="text-center">Sign up</h1>
      <div class="form-group">
        <label for="">Name</label>
        <input v-model="name" type="text" name="" id="" class="form-control" />
      </div>
      <div class="form-group">
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
      <div class="form-group">
        <label for="">password confirm</label>
        <input
          v-model="passwordConfirm"
          type="password"
          name=""
          id=""
          class="form-control"
        />
      </div>

      <input
        @click="signup"
        type="button"
        value="Submit"
        class="btn btn-primary mt-3 d-block mx-auto"
      />
    </form>
  </div>
  <ErrorView :error="error" :closeError="closeError" v-show="error" />
</template>

<script>
import axios from "axios";
import ErrorView from "@/components/ErrorView.vue";

export default {
  name: "SignUp",
  components: { ErrorView },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      url: "http://localhost:8000/api/v1/",
      error: null,
    };
  },
  methods: {
    async signup() {
      await axios
        .post(`${this.url}auth/signup`, {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        })
        .then((result) => {
          this.$router.push("/");
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
};
</script>

<style scoped>
form {
  min-width: 400px;
}
</style>
