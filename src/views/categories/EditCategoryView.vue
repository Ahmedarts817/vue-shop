<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Edit Category</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form action="" enctype="multipart/form-data">
          <div class="form-group">
            <label for="">Category Name</label>
            <input
              v-model="name"
              type="text"
              name=""
              id=""
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="">Category Image</label>
            <input
              @change="selectFile"
              type="file"
              class="form-control"
              ref="file"
            />
          </div>
          <input
            @click="addCategory"
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
  name: "EditCategory",
  data() {
    return {
      name: "",
      image: "",
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
      console.log(this.image);
    },
    async addCategory() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      const viewURL = "http://localhost:8000/api/v1/";

      await axios({
        method: "put",
        url: `${viewURL}categories/${this.$route.params.id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.$router.push("/categories");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
