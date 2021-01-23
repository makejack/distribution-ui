<template>
  <div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column
        label="总金额"
        prop="total"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="提现金额"
        prop="amount"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="手续费"
        prop="handlingFee"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 200" type="success">提现成功</el-tag>
          <el-tag v-else type="danger">提现失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="消息" prop="message"></el-table-column>
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
import { withdrawalHistory } from "../api/withdrawal";
import { formatDatetime } from "../utils/format";

export default {
  name: "WithdrawalTable",
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
      },
    };
  },
  methods: {
    formatAmount(value) {
      return value / 100;
    },
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatTableeDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadWithdrawal();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadWithdrawal();
    },
    loadWithdrawal() {
      this.tableLoading = true;
      withdrawalHistory(this.pagination)
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
    this.loadWithdrawal();
  },
};
</script>
