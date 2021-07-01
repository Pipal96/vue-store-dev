<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'card'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">3 товара</span>
    </div>

    <section class="cart">
      <form @submit.prevent="sendOrder" class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model.trim.lazy="formData.name"
                          name="name"
                          :title="'ФИО'"
                          :type="'text'"
                          :placeholder="'Введите ваше полное имя'"
                          :error="formError.name"/>
            <BaseFormText v-model.trim.lazy="formData.address"
                          name="address"
                          :title="'Адрес доставки'"
                          :type="'text'"
                          :placeholder="'Введите ваш адрес'"
                          :error="formError.address"/>
            <BaseFormText v-model.trim.lazy="formData.phone"
                          name="phone"
                          :title="'Номер телефона'"
                          :type="'tel'"
                          :placeholder="'Введите ваш телефон'"
                          :error="formError.phone"/>
            <BaseFormText v-model.trim.lazy="formData.email"
                          name="email"
                          :title="'Email'"
                          :type="'email'"
                          :placeholder="'Введи ваш Email'"
                          :error="formError.email"/>
            <BaseFormTextarea v-model.trim.lazy="formData.comment"
                              name="comments"
                              :title="'Комментарий к заказу'"
                              :placeholder="'Ваши пожелания'"
                              :error="formError.comment"
            />
          </div>
        </div>

        <InfoProduct :products="products"
                     :totalPrice="totalPrice"
                     :isLoad="isLoad"
                     :isLoading="isLoading"
        />
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import InfoProduct from '@/components/infoProduct.vue';

export default {
  name: 'OrderPage',
  components: {
    InfoProduct,
    BaseFormTextarea,
    BaseFormText,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      isLoad: false,
      isLoading: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.cardDetailProducts;
    },
    totalPrice() {
      return this.$store.getters.cardTotalPrice;
    },
  },
  methods: {
    sendOrder() {
      this.isLoading = true;
      this.isLoad = false;
      this.formError = {};
      this.formErrorMessage = '';
      this.$store.dispatch('sendOrder', this.formData)
        .then((response) => {
          this.isLoading = false;
          this.isLoad = true;
          this.$store.commit('resetOfBasket');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.isLoading = false;
          this.isLoad = false;
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>

<style scoped>

</style>
