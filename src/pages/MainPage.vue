<template>
  <main class="content container">
    <Loader v-if="isLoading"></Loader>
    <p v-if="isErrorLoading">Произошла ошибка при загрузке</p>
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
      <AppFilter
        :filterPriceFrom.sync="filterPriceFrom"
        :filterPriceTo.sync="filterPriceTo"
        :filterCategoryId.sync="filterCategoryId"
        :filterColor.sync="filterColor"
      />
      <section class="catalog">
        <AppCatalog :product="products"/>
        <AppPagination :current-page.sync="currentPage"
                       :count-page="countProducts"
                       :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import AppCatalog from '@/components/AppCatalog.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppFilter from '@/components/AppFilter.vue';
import Loader from '@/components/Loader.vue';
import BASE_PATH_API from '@/config';
import axios from 'axios';

export default {
  name: 'MainPage',
  components: {
    AppFilter,
    AppPagination,
    AppCatalog,
    Loader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      currentPage: 1,
      productsPerPage: 6,
      filterColor: null,
      productsData: null,
      loadData: null,
      isLoading: false,
      isErrorLoading: false,
    };
  },
  watch: {
    currentPage() {
      this.loadProduct();
    },
    filterColor() {
      this.loadProduct();
    },
    filterPriceFrom() {
      this.loadProduct();
    },
    filterPriceTo() {
      this.loadProduct();
    },
    filterCategoryId() {
      this.loadProduct();
    },

  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((prod) => ({
        ...prod,
        image: prod.image.file.url,
      })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProduct() {
      this.isLoading = true;
      this.isErrorLoading = false;
      clearInterval(this.loadData);
      this.loadData = setTimeout(() => axios.get(`${BASE_PATH_API}/api/products`,
        {
          params: {
            page: this.currentPage,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColor,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
        .then((response) => {
          this.productsData = response.data;
        })
        .catch(() => {
          this.isErrorLoading = true;
        })
        .then(() => {
          this.isLoading = false;
        }), 0);
    },
  },
  created() {
    this.loadProduct();
  },
};

</script>

<style scoped>

</style>
