<template>
  <div>
    <div class="toolbar">
      <h2>退款列表</h2>
      <div class="toolbar-btn">
        <el-button @click="loadRefundList" :loading="tableLoading"
          >刷新</el-button
        >
      </div>
    </div>

    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="avatarUrl" label="#">
        <template slot-scope="scope">
          <el-avatar size="large" :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="买家名称"></el-table-column>
      <el-table-column
        prop="refundAmount"
        label="退款金额"
        :formatter="formatAmount"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="退款状态"
        :formatter="formatRefundStatus"
      ></el-table-column>
      <el-table-column
        prop="createat"
        label="申请时间"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="auditTime"
        label="处理时间"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewHandle(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
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
import { refundList } from "../api/refund";
import { formatOrderItemStatus, formatDatetime } from "../utils/format";

export default {
  name: "RefundList",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
      },

      dialogVisible: false,
    };
  },
  methods: {
    formatDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    formatAmount(row, column, cellValue) {
      return cellValue / 100;
    },
    formatRefundStatus(row, column, cellValue) {
      return formatOrderItemStatus(cellValue);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadRefundList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadRefundList();
    },
    viewHandle(row) {
      this.$router.push({ name: "Refund", params: { id: row.id } });
    },
    loadRefundList() {
      this.tableLoading = true;
      refundList(this.pagination)
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
    this.loadRefundList();
  },
};
</script>
