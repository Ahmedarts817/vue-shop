import axios from "axios";

export default (await import("vue")).defineComponent({
  name: "NavBar",
  data() {
    return {
      baseURL: "http://localhost:8000/api/v1/",
      name: null,
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
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getMyinfo();
  },
});
