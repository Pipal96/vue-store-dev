<template>
  <BaseFormField :title="title" :error="error">
    <input v-model.trim.lazy="dataValue"
           :type="type" class="form__input"
           :placeholder="placeholder"
           name="name"
    >
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormText',
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style scoped>

</style>
