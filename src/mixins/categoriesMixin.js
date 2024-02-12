import axios from "axios";

const categoriesMixin = {
  data() {
    return {
      categories: null,
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async fetchCategories() {
      await axios
        .get(`${this.baseUrl}categories`)
        .then((res) => (this.categories = res.data.data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchCategories();
  },
};

export default categoriesMixin;
