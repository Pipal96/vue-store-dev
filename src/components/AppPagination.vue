<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         aria-label="Предыдущая страница"
         :class="{'pagination__link--disabled': this.currentPage === 1}"
         @click.prevent="lastPage()">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="number in pages" :key="number">
      <a class="pagination__link" :class="{'pagination__link--current': number === currentPage }"
         @click.prevent="returnCurrentPage(number)"
      >
        {{ number }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         href="#" aria-label="Следующая страница"
         :class="{'pagination__link--disabled': this.currentPage === 4}"
         @click.prevent="nextPage()"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPagination',
  props: ['currentPage', 'countPage', 'perPage'],
  methods: {
    returnCurrentPage(currentPage) {
      this.$emit('update:current-page', currentPage);
    },
    nextPage() {
      if (this.currentPage < this.pages) {
        this.$emit('update:current-page', this.currentPage + 1);
      }
    },
    lastPage() {
      if (this.currentPage > 1) {
        this.$emit('update:current-page', this.currentPage - 1);
      }
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.countPage / this.perPage);
    },
  },
};
</script>

<style scoped>

</style>
