<template>
  <li class="cart__order">
    <h3>{{ product.product.title }}</h3>
    <b>{{ product.product.price | numberFormat }} ₽</b>
    <span>Артикул: {{ product.productId }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'infoItem',
  props: {
    product: {
      type: Object || Array,
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>

</style>
