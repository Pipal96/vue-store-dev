import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardProducts: [],
    userAccessKey: null,
    cardProductsData: [],
    loadProducts: false,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetOfBasket(state) {
      state.cardProducts = [];
      state.cardProductsData = [];
    },
    syncCardProduct(state) {
      state.cardProducts = state.cardProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },

    updateAccessKey(state, access) {
      state.userAccessKey = access;
    },
    updateCardProductsData(state, productsData) {
      state.cardProductsData = productsData;
    },
    deleteCardProduct(state, productId) {
      state.cardProducts = state.cardProducts.filter((item) => item.productId !== productId);
    },

    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const item = state.cardProducts.find((elem) => elem.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    setStatusLoading(state, status) {
      state.loadProducts = status;
    },
  },
  getters: {
    orderInfoData(state) {
      return state.orderInfo;
    },
    cardDetailProducts(state) {
      return state.cardProducts.map((item) => {
        const { product } = state.cardProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    countProductsCart(state) {
      return state.cardProducts.length;
    },
    cardTotalPrice(state, getters) {
      return getters.cardDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    countProducts(state, getters) {
      return getters.cardDetailProducts.reduce((previousValue, item) => (
        previousValue + item.amount
      ), 0);
    },
    getProductById(state, productId) {
      return state.cardProducts.find((item) => item.productId === productId);
    },
  },

  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${config}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCard(context) {
      context.commit('setStatusLoading', true);
      return axios.get(`${config}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((resolve) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', resolve.data.user.accessKey);
            context.commit('updateAccessKey', resolve.data.user.accessKey);
          }
          context.commit('updateCardProductsData', resolve.data.items);
          context.commit('setStatusLoading', false);
          context.commit('syncCardProduct');
        });
    },
    addProductCard(context, params) {
      context.commit('setStatusLoading', true);
      return axios.post(`${config}/api/baskets/products`, {
        productId: params.productId,
        quantity: params.amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((resolve) => {
          context.commit('updateCardProductsData', resolve.data.items);
          context.commit('setStatusLoading', false);
          context.commit('syncCardProduct');
        });
    },

    updateCartProductAmount(context, {
      productId,
      amount,
    }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount,
      });
      return axios.put(`${config}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((resolve) => {
          context.commit('updateCardProductsData', resolve.data.items);
        })
        .catch(() => {
          context.commit('syncCardProduct');
        });
    },
    deleteCartProduct(context, { productId }) {
      context.commit('setStatusLoading', true);
      return axios.delete(`${config}/api/baskets/products`, {
        data: {
          productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCardProductsData', response.data.items);
          context.commit('setStatusLoading', false);
          context.commit('syncCardProduct');
        });
    },
    sendOrder(context, formData) {
      return axios.post(`${config}/api/orders`, {
        ...formData,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      });
    },
  },
});
