<template>
  <div>
    <a
      v-if="value"
      :href="`tel:${value}`"
      class="text-blue-500 hover:text-blue-900 hover:underline cursor-pointer"
    >{{value}}</a>
    <span v-else>- -</span>
  </div>
</template>
<script>
import get from "lodash/get";
export default {
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    value() {
      return get(this.row, this.column.prop);
    }
  }
};
</script>
<style>
</style>
