<template>
  <ul class="catalog__list">
    <CatalogItem v-for="prod in product" :product="prod" :key="prod.id"/>
  </ul>
</template>

<script>
import CatalogItem from '@/components/CatalogItem.vue';

export default {
  name: 'AppCatalog',
  components: {
    CatalogItem,
  },
  props: ['product'],
};
</script>

<style scoped>

</style>
