<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Add Brand</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="" enctype="multipart/form-data">
          <div class="form-group">
            <label for="">Brand Name</label>
            <input
              v-model="name"
              type="text"
              name=""
              id=""
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">Brand Image</label>
            <input
              type="file"
              ref="file"
              v-on:change="selectFile"
              class="form-control"
            />
          </div>

          <input
            @click="addBrand"
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
  name: "AddBrand",
  data() {
    return {
      name: "",
      image: "",
      baseURL: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    async addBrand() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);
      await axios({
        method: "post",
        url: `${this.baseURL}brands`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.$router.push("/brands");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
