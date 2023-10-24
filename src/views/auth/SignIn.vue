<template>
  <h1>Sign In</h1>
  <form action="" enctype="multipart/form-data">
    <div class="form-group">
      <label for="">Email</label>
      <input v-model="email" type="email" name="" id="" class="form-control" />
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
      value="Submit"
      class="btn btn-primary my-3"
    />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      url: "http://localhost:8000/api/v1/",
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
