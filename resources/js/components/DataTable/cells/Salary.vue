<template>
  <div class="truncate">
    <span v-if="value">{{value}}</span>
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
      const value = get(this.row, this.column.prop);
      if (!value) {
        return null;
      }
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  }
};
</script>
<style>
</style>
