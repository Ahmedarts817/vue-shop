<template>
  <div class="container">
    <div class="row">
      <div class="text-center my-4">
        <h3>Our Products</h3>
      </div>
      <router-link
        :to="{ name: 'addProduct' }"
        v-show="$route.name === 'adminproducts'"
      >
        <a class="btn btn-success">Add Product</a>
      </router-link>
    </div>
    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-lg-4 col-xl-3 p-2"
      >
        <ProductBox :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/product/ProductBox.vue";
import productsMixin from "@/mixins/productsMixin";
export default {
  name: "ProductsView",
  components: { ProductBox },
  mixins: [productsMixin],
};
</script>
