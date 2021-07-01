import BaseFormField from '@/components/BaseFormField.vue';

export default {
  components: { BaseFormField },
  props: {
    title: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {},
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
