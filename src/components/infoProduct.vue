<template>
  <div v-if="!products" class="cart__block">
    <button v-if="$route.name === 'order'"
            class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
  <div v-else class="cart__block">
    <ul class="cart__orders">
      <info-item v-for="(product) in products"
                 :key="product.productId"
                 :product="product"/>
    </ul>

    <div class="cart__total">
      <p>Итого: <b>{{ products.length }}</b>
        {{ products.length === 1 ? 'товар' : 'товара' }} на сумму <b>
          {{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <button v-if="$route.name === 'order' && products.length"
            class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
    <p v-if="isLoading">Отправка...</p>
    <p v-if="isLoad">Товар отправлен на сервер</p>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import InfoItem from '@/components/infoItem.vue';

export default {
  name: 'infoProduct',
  components: { InfoItem },
  filters: { numberFormat },
  props: {
    products: {
      type: Array,
      default: () => ([]),
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
