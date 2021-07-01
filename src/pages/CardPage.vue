<template>
  <main v-if="!products" class="content container">
    <loader/>
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
       {{ countProducts }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CardItem v-for="(item) in products" :key="item.productId" :item.sync="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ total | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
                       class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapMutations } from 'vuex';
import CardItem from '@/components/CardItem.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'CardPage',
  components: { Loader, CardItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cardDetailProducts',
      total: 'cardTotalPrice',
      countProducts: 'countProducts',
    }),
  },
  methods: {
    ...mapMutations({}),
  },
};
</script>

<style scoped>

</style>
