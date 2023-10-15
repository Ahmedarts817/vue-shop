<template>
  <div class="card">
    <!-- <div>
        <img :src="product.imageUrl" class="card-img-top" alt="this is a pic" />
      </div> -->
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <img :src="product.imageCover" alt="" class="card-img-top" />

      <router-link
        :to="{ name: 'ProductDetails', params: { id: product._id } }"
      >
        <button class="btn btn-primary">Product Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: ["product"],
  data() {
    return {};
  },
};
</script>
