<template>
  <router-link :to="{name: 'card'}" class="header__cart" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span v-if='$store.state.loadProducts' class="header__count"
          aria-label="Загрузка количества товаров">...</span>
    <span v-else class="header__count" aria-label="Количество товаров">
      {{ counter }}</span>
  </router-link>
</template>

<script>

export default {
  name: 'CardIndicator',
  data() {
    return {
    };
  },
  computed: {
    counter() {
      return this.$store.getters.countProductsCart;
    },
  },
};
</script>

<style scoped>

</style>
