<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Edit Brand</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="">
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
            <label for="">Brand image</label>
            <input
              type="file"
              ref="file"
              @change="selectFile"
              class="form-control"
            />
          </div>

          <input
            @click="EditBrand"
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
  name: "editBrand",
  data() {
    return {
      baseURL: "http://localhost:8000/api/v1/",

      name: "",
      image: "",
    };
  },
  methods: {
    async selectFile() {
      this.image = this.$refs.file.files[0];
    },

    async EditBrand() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      await axios({
        method: "put",
        url: `${this.baseURL}brands/${this.$route.params.id}`,
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
