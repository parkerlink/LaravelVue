<template>
  <base-badge :color="badgeColor">{{value}}</base-badge>
</template>
<script>
import get from "lodash/get";
import BaseBadge from "../BaseBadge";

export default {
  components: {
    BaseBadge
  },
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
      if (value === undefined) {
        return "N/A";
      }
      return value;
    },
    badgeColor() {
      if (this.value === "F") {
        return "purple";
      }
      return "teal";
    }
  }
};
</script>
<style>
</style>
