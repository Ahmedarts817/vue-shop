<template>
  <h1>Sign up</h1>
  <form action="" enctype="multipart/form-data">
    <div class="form-group">
      <label for="">Name</label>
      <input v-model="name" type="text" name="" id="" class="form-control" />
    </div>
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
      class="btn btn-primary my-3"
    />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      url: "http://localhost:8000/api/v1/",
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
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
