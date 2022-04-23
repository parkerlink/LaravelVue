<template>
  <div class="data-table">
    <div
      v-if="showAction('search') || showAction('refresh') || hasTitle"
      class="w-full flex flex-wrap items-center mb-4"
      :class="{'justify-end': !hasTitle, 'justify-between': hasTitle}"
    >
      <div>
        <slot name="header-left">
          <h3 class="text-xl font-semibold tracking-wider">{{title}}</h3>
        </slot>
      </div>
      <div class="flex items-center">
        <div>
          <ElInput
            v-if="showAction('search')"
            v-model="filters.search"
            :placeholder="'Search...'"
            prefix-icon="el-icon-search"
            class="search-input"
            clearable
            @change="refresh"
          />
        </div>
        <div v-if="showAction('refresh')" class="ml-2">
          <BaseButton variant="white" @click="refresh" size="sm">
            <RefreshCwIcon class="w-5 h-5 text-blue-500"/>
          </BaseButton>
        </div>
        <div v-if="showAction('add')" class="ml-2">
          <BaseButton variant="primary" @click="$emit('add', $event)" size="sm">
            <PlusIcon class="w-5 h-5 text-white"/>
          </BaseButton>
        </div>
      </div>
    </div>
    <BaseTable
      :data="tableData"
      :local-sort="url === ''"
      :loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
      @sort="onSort"
    >
      <BaseTableColumn
        v-for="(column, index) in columns"
        :key="column.prop || index"
        v-bind="column"
      >
        <template v-slot="{row}">
          <slot :name="column.prop" :row="row">
            <template v-if="column.component">
              <component :is="column.component" :column="column" :row="row"></component>
            </template>
            <div v-else class="truncate">{{get(row, column.prop) || '- -'}}</div>
          </slot>
        </template>
      </BaseTableColumn>

      <BaseTableColumn v-if="actions" align="right" v-slot="{row, index}">
        <BaseButton
          v-if="showAction('view')"
          size="sm"
          variant="gray-link"
          @click="$emit('view', row, index)"
        >View</BaseButton>
        <BaseButton
          v-if="showAction('edit')"
          variant="primary-link"
          size="sm"
          @click="$emit('edit', row, index)"
        >Edit</BaseButton>
        <BaseButton
          v-if="showAction('delete')"
          variant="danger-link"
          size="sm"
          @click="onDelete(row, index)"
        >Delete</BaseButton>
        <slot name="extra-actions"></slot>
      </BaseTableColumn>
    </BaseTable>

    <div class="w-full flex justify-end mt-4 table-pagination">
      <ElPagination
        v-show="tableData.length > 0 && url"
        @size-change="perPageChange"
        @current-change="refresh"
        :current-page.sync="pagination.current_page"
        :page-sizes="perPageOptions"
        :page-size="pagination.per_page"
        :pager-count="5"
        layout="total, slot, prev, pager, next, jumper"
        :total="pagination.total"
      >
        <ElSelect
          class="select-default"
          size="mini"
          @change="refresh"
          v-model="pagination.per_page"
        >
          <ElOption
            v-for="value in perPageOptions"
            class="select-default"
            :key="value"
            :label="value"
            :value="value"
          ></ElOption>
        </ElSelect>
      </ElPagination>
    </div>
  </div>
</template>
<script>
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";

import { SearchIcon, RefreshCwIcon, PlusIcon } from "vue-feather-icons";
import { Select, Option, Pagination, Input } from "element-plus";

import PhoneLink from "./cells/PhoneLink";
import EmailLink from "./cells/EmailLink";
import Salary from "./cells/Salary";
import GenderBadge from "./cells/GenderBadge";
import BaseButton from "./BaseButton";
import BaseTable from "./BaseTable";
import BaseTableColumn from "./BaseTableColumn";

export default {
  inheritAttrs: false,
  components: {
    PhoneLink,
    EmailLink,
    Salary,
    GenderBadge,
    SearchIcon,
    PlusIcon,
    RefreshCwIcon,
    BaseButton,
    BaseTable,
    BaseTableColumn,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Pagination.name]: Pagination
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    title: String,
    actions: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    urlQuery: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableData: cloneDeep(this.data),
      loading: false,
      perPageOptions: [5, 10, 15, 20, 25, 50],
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 5
      },
      filters: {
        search: "",
        sort: ""
      }
    };
  },
  computed: {
    actionsArray() {
      return this.actions.split(",").map(action => action.trim().toLowerCase());
    },
    hasTitle() {
      return this.$slots["header-left"] || this.title;
    }
  },
  methods: {
    get,
    showAction(action) {
      if (!action) {
        return false;
      }
      return this.actionsArray.includes(action);
    },
    perPageChange(value) {
      this.pagination.per_page = value;
      this.refresh();
    },
    onSort({ prop, direction }) {
      if (direction) {
        this.filters.sort = `${prop}|${direction}`;
      } else {
        this.filters.sort = "";
      }
      this.refresh();
    },
    async refresh() {
      if (!this.url) {
        return;
      }
      try {
        this.loading = true;
        // Change the params here based on your own api
        const params = {
          page: this.pagination.current_page,
          per_page: this.pagination.per_page
        };
        if (this.filters.search) {
          params.filter = this.filters.search;
        }

        if (this.filters.sort) {
          params.sort = this.filters.sort;
        }

        const fullUrl = this.url + this.urlQuery;
        const { data } = await axios.get(fullUrl, { params });
        this.pagination = {
          per_page: data.per_page,
          total: data.total,
          current_page: data.current_page
        };
        this.tableData = data.data;
      } catch (err) {
        alert("Could not fetch the table data");
      } finally {
        this.loading = false;
      }
    },
    async onDelete(row, index) {
      try {
        const confirmed = await this.$deleteConfirm({
          title: "Delete row",
          description: `Are you sure you want to delete this row? The data will be removed on our servers. This action cannot be undone.`
        });

        if (!confirmed) {
          return;
        }

        // Replace with your own delete method
        await axios.delete(`${this.url}/${row.id}`);

        if (index === undefined || index < 0) {
          return;
        }
        this.tableData.splice(index, 1);

        alert("Row deleted successfully");
      } catch (err) {
        console.warn(err);
        alert("Could not delete the specified row");
      }
      this.$emit("delete", row);
    }
  },
  created() {
    this.refresh();
  }
};
</script>
<style scoped>
.search-input {
  min-width: 250px;
}
</style>
