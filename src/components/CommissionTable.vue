<template>
  <div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column
        label="佣金"
        prop="commission"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column label="比例 %" prop="percentage"></el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        :formatter="formatCommissionStatus"
      ></el-table-column>
      <el-table-column
        label="结算时间"
        prop="settlementTime"
        :formatter="formatTableeDate"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatTableeDate"
      ></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalRows"
        :current-page="pagination.page"
        :page-size="pagination.limit"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { commissionHistory } from "../api/commission";
import { formatCommissionStatus, formatDatetime } from "../utils/format";

export default {
  name: "CommissionTable",
  props: {
    customerId: {
      required: false,
      default: null,
    },
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        customerId: this.customerId,
        status: null,
      },
    };
  },
  methods: {
    formatAmount(value) {
      return value / 100;
    },
    formatCommissionStatus(row, column, cellValue) {
      return formatCommissionStatus(cellValue);
    },
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatTableeDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadCommission();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadCommission();
    },
    loadCommission() {
      this.tableLoading = true;
      commissionHistory(this.pagination)
        .then((res) => {
          this.tableLoading = false;
          if (res.code === 0) {
            this.tableData = res.data.result;
            this.totalRows = res.data.totalRows;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
  },
  mounted() {
    this.loadCommission();
  },
};
</script>
