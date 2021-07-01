<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form @submit.prevent="submit" class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentProductId">
            <option value="0">Все категории</option>
            <option :value="item.id" v-for="item in this.categories" :key="item.id"
            >{{ item.title }}
            </option>
          </select>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="(color) in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color"
                     v-model="currentColor" :value="color.id">
              <span class="colors__value" :style="{backgroundColor: color.code}"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8"
                     checked="">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery"
              type="submit">
        Применить
      </button>
      <button @click="reset" class="filter__reset button button--second" type="button">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  name: 'AppFilter',
  props: ['filterPriceFrom', 'filterPriceTo', 'filterCategoryId', 'filterColor'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentProductId: 0,
      categoriesData: null,
      currentColor: '',
      colorsData: null,
    };
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
  watch: {
    filterPriceFrom(newValue) {
      this.currentPriceFrom = newValue;
    },
    filterPriceTo(newValue) {
      this.currentPriceTo = newValue;
    },
    filterCategoryId(newValue) {
      this.currentProductId = newValue;
    },
    filterColors(newValue) {
      this.currentColor = newValue;
    },
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  methods: {
    submit() {
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      this.$emit('update:filterCategoryId', this.currentProductId);
      this.$emit('update:filterColor', this.currentColor);
    },
    reset() {
      this.$emit('update:filterPriceFrom', 0);
      this.$emit('update:filterPriceTo', 0);
      this.$emit('update:filterCategoryId', 0);
      this.$emit('update:filterColor', '');
    },
    loadCategories() {
      axios.get(`${config}/api/productCategories`)
        .then((data) => {
          this.categoriesData = data.data;
        });
    },
    loadColors() {
      axios.get(`${config}/api/colors`)
        .then((data) => {
          this.colorsData = data.data;
        });
    },
  },
};
</script>

<style scoped>

</style>
