<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
            </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color) in colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="color.code">
          <span class="colors__value" :style="{backgroundColor: color.code}">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import goToPage from '@/helpers/goToPage';

export default {
  name: 'CatalogItem',
  props: {
    product: {
      type: Object,
      default: Object,
    },
  },
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
  computed: {
    colors() {
      return this.product.colors;
    },
  },
};

</script>

<style scoped>

</style>
