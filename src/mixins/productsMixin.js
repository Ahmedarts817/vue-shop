import axios from "axios";

const productsMixin = {
  data() {
    return {
      products: null,
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchProducts() {
      await axios
        .get(`${this.baseUrl}products`)
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchProducts();
  },
};

export default productsMixin;
