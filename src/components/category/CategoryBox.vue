<template>
  <div class="card">
    <div>
      <img :src="category.image" class="card-img-top" alt="this is a pic" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ category.name }}</h5>

      <p class="card-text">{{ category.slug }}</p>
      <router-link
        v-show="$route.name === 'categories'"
        :to="{ name: 'CategoryDetails', params: { id: category._id } }"
      >
        <button class="btn btn-primary">category Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategortBox",
  props: ["category"],
  data() {
    return {};
  },
};
</script>
