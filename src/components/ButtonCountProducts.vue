<template>
  <div class="form__counter">
    <button @click="decrement" type="button" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input :value="productAmount" name="count"
           disabled>

    <button @click="increment" type="button" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['productAmount'],
  name: 'ButtonCountProducts',
  methods: {
    decrement() {
      if (this.productAmount > 1) {
        this.$emit('update:productAmount', this.productAmount - 1);
      }
    },
    increment() {
      this.$emit('update:productAmount', this.productAmount + 1);
    },
    // decrement() {
    //   if (this.productAmount > 1) {
    //     this.$store.commit('updateCardProductAmount',
    //       {
    //         productId: this.productId,
    //         amount: this.productAmount - 1,
    //       });
    //   }
    // },
    // increment() {
    //   this.$store.commit('updateCardProductAmount',
    //     {
    //       productId: this.productId,
    //       amount: this.productAmount + 1,
    //     });
    // },
  },
};
</script>

<style scoped>

</style>
