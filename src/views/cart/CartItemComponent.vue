<template>
  <h5>
    <p>{{ cartItem.product }}</p>
    <img :src="cartItem.product.imageCover" alt="" />
    product title: {{ cartItem.product.title }} , product price:
    {{ cartItem.price }} , product quantity: {{ cartItem.quantity }}

    <input v-model="quantity" type="number" />
    <button @click="updateItemQuantity(cartItem._id)" class="btn">
      update
    </button>

    <button @click="removeFromCart(cartItem._id)" class="btn btn-primary">
      Remove from cart
    </button>
  </h5>
</template>
<script>
import axios from "axios";

export default {
  name: "CartItemComponent",
  props: ["cartItem", "fetchData"],
  data() {
    return {
      quantity: null,
      baseUrl: "http://localhost:8000/api/v1/",
    };
  },
  methods: {
    async removeFromCart(itemId) {
      await axios({
        method: "delete",
        url: `${this.baseUrl}cart/${itemId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
    async updateItemQuantity(itemId) {
      await axios({
        method: "put",
        url: `${this.baseUrl}cart/${itemId}`,
        data: { quantity: this.quantity },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(() => {
          this.fetchData();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
