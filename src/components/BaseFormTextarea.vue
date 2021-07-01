<template>
  <BaseFormField :title="title" :error="error">
    <textarea v-model.trim.lazy="dataValue"
              :placeholder="placeholder"
              class="form__input form__input--area"
              name="name"
    ></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormTextarea',
  mixins: [formFieldMixin],
};
</script>

<style scoped>

</style>
