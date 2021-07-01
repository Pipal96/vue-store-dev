<template>
  <div>
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/pages/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.$store.commit('updateAccessKey', userAccessKey);
    }
    this.$store.dispatch('loadCard');
  },
  data() {
    return {};
  },
};

</script>

<style>

</style>
