<template>
  <main class="content container" v-if="isLoading">
    <Loader></Loader>
  </main>
  <main class="content container" v-else-if="!productData">
    <p>Произошла ошибка при загрузке</p>
  </main>
  <main class="content container" v-else>
    <div>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name:'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="image.url"
                 alt="Название товара">
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form @submit.prevent="addToCard" class="form" action="#" method="POST">
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item" v-for="(color) in product.colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio"
                             name="color-item" :value="color.id" checked="" v-model="currentColor">
                      <span class="colors__value" :style="{'background-color': color.code}">
                    </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                      <span class="sizes__value">
                      32gb
                    </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                      <span class="sizes__value">
                      64gb
                    </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only" type="radio"
                             name="sizes-item" value="128" checked="">
                      <span class="sizes__value">
                      128gb
                    </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <ButtonCountProducts :productAmount.sync="productAmount"/>
                <button class="button button--primery" type="submit" :disabled="productLoading">
                  В корзину
                </button>
              </div>
              <div v-show="productLoad">Товар добавлен в корзину</div>
              <div v-show="productLoading">Добавление...</div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>

            <a href="#">
              Все характеристики
            </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
              оптимизировать свои велотренировки, сделав их
              максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с
              датчиками по ANT+, объединяя полученную с
              них информацию. Данные отображаются на дисплее, а также сохраняются
              на смартфоне. При этом на мобильное
              устройство можно установить как фирменное приложение,
              так и различные приложения сторонних разработчиков.
              Велокомпьютер точно отслеживает местоположение, принимая
              сигнал с целого комплекса спутников. Эта информация
              позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
              всего 74,6 x 47,3 x 22,1 мм.
              что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
              На обращенной к
              пользователю стороне расположен дисплей диагональю 56 мм.
              На дисплей выводятся координаты
              и скорость, а
              также полученная со смартфона и синхронизированных датчиков информация: интенсивность,
              скорость вращения
              педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера
              имеет степень защиты от
              влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
              кратковременное (до 30 минут)
              погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ButtonCountProducts from '@/components/ButtonCountProducts.vue';
import config from '@/config';
import axios from 'axios';
import Loader from '@/components/Loader.vue';

export default {
  name: 'ProductPage',
  components: {
    Loader,
    ButtonCountProducts,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      currentColor: '',
      isLoading: false,
      isErrorLoading: false,
      loadData: null,
      productLoad: false,
      productLoading: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    idPage() {
      return this.$route.params.id;
    },
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
    image() {
      return this.productData.image.file;
    },
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      this.isErrorLoading = false;
      clearInterval(this.loadData);
      this.loadData = setTimeout(() => {
        axios.get(`${config}/api/products/${this.idPage}`)
          .then((prod) => {
            this.productData = prod.data;
          })
          .catch(() => {
            this.isErrorLoading = true;
          })
          .then(() => {
            this.isLoading = false;
          });
      }, 0);
    },
    addToCard() {
      this.productLoading = true;
      this.productLoad = false;

      const params = {
        productId: this.idPage,
        amount: this.productAmount,
      };
      this.$store.dispatch('addProductCard', params)
        .then(() => {
          this.productLoad = true;
          this.productLoading = false;
        });
    },
  },
  watch: {
    idPage: {
      handler() {
        this.getProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
