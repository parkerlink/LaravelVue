<template>
  <div class="-my-2 py-2 overflow-x-auto sm:-mx-4 sm:px-4 lg:-mx-4 lg:px-4">
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
    >
      <table class="min-w-full" v-loading="loading && data.length">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.prop"
              class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              :style="column.getStyles()"
            >
              <div
                class="flex items-center th-cell"
                :class="{
                    'cursor-pointer select-none': column.sortable,
                    'justify-end': column.align === 'right',
                    'justify-start': column.align === 'left',
                    'justify-center': column.align === 'center',
                }"
                @click="toggleSort(column)"
              >
                <ColumnHeaderRenderer :column="column"/>
                <div v-if="column.sortable" class="flex flex-col ml-1">
                  <ChevronUpIcon
                    class="w-3 h-3 -mb-1"
                    :stroke-width="column.sortDirection === 'asc' ? 5 : 3"
                    :class="{'text-blue-600': column.sortDirection === 'asc'}"
                  />
                  <ChevronDownIcon
                    class="w-3 h-3"
                    :stroke-width="column.sortDirection === 'desc' ? 5 : 3"
                    :class="{'text-blue-600': column.sortDirection === 'desc'}"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <slot></slot>
        <tbody class="bg-white">
          <tr v-for="(row, index) in tableData" :key="row[rowKey] || index">
            <td
              v-for="column in columns"
              :key="column.prop"
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-700 td-cell"
              :class="{
                              'text-right': column.align === 'right',
                              'text-left': column.align === 'left',
                              'text-center': column.align === 'center',
                            }"
              :style="column.getStyles()"
            >
              <ColumnRenderer :row="row" :index="index" :column="column"/>
            </td>
          </tr>
          <tr v-if="data.length === 0 && !loading || data.length === 0 && loading" key="empty">
            <td :colspan="columns.length" class="text-center py-5 text-gray-500 text-lg td-cell">
              <slot name="empty">
                <span v-if="!loading">No Data</span>
                <span v-else-if="data.length === 0 && loading">
                  <i class="el-icon el-icon-loading"></i>
                  Loading...
                </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Loading } from "element-plus";

import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/orderBy";
import { ChevronDownIcon, ChevronUpIcon } from "vue-feather-icons";

Vue.use(Loading.directive);

function getColumnData(row, prop) {
  return get(row, `${prop}`, "");
}

export default {
  components: {
    ColumnRenderer: {
      props: ["row", "column", "index"],
      render(h) {
        if (this.column.$scopedSlots.default) {
          const renderedScopedSlot = this.column.$scopedSlots.default({
            row: this.row,
            index: this.index
          });

          return h("div", { attrs: { class: "cell" } }, [renderedScopedSlot]);
        }
        return h("span", [getColumnData(this.row, this.column.prop)]);
      }
    },
    ColumnHeaderRenderer: {
      props: ["column"],
      render(h) {
        if (this.column.$scopedSlots.header) {
          return this.column.$scopedSlots.header({
            column: this.column
          });
        }
        return h("span", [this.column.label]);
      }
    },
    ChevronUpIcon,
    ChevronDownIcon
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: "id"
    },
    localSort: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      addColumn: this.addColumn,
      removeColumn: this.removeColumn
    };
  },
  data() {
    return {
      columns: [],
      tableData: []
    };
  },
  methods: {
    addColumn(step) {
      const index = this.columns.length;
      this.columns.splice(index, 0, step);
    },
    removeColumn(step) {
      const columns = this.columns;
      const index = columns.indexOf(step);

      if (index > -1) {
        columns.splice(index, 1);
      }
    },
    resetOtherColumnsSort(exceptionColumn) {
      this.columns.forEach(column => {
        if (exceptionColumn.prop === column.prop) {
          return;
        }
        column.sortDirection = "";
      });
    },
    toggleSort(column) {
      if (!this.localSort) {
        this.resetOtherColumnsSort(column);
      }

      column.toggleSort();
      this.$emit("sort", {
        prop: column.prop,
        direction: column.sortDirection
      });

      if (!this.localSort) {
        return;
      }

      const columnsToSort = this.columns.filter(c => c.sortDirection !== "");
      const columnProps = columnsToSort.map(c => c.prop);
      const columnSortOrders = columnsToSort.map(c => c.sortDirection);

      if (columnProps.length === 0) {
        this.tableData = cloneDeep(this.data);
      } else {
        this.tableData = orderBy(this.tableData, columnProps, columnSortOrders);
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.tableData = cloneDeep(value);
      }
    }
  }
};
</script>
<style>
.el-loading-mask .el-loading-spinner {
  display: flex;
  justify-content: center;
}
</style>
