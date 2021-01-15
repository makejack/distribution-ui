<template>
  <div>
    <div class="toolbar">
      <h2>开票申请列表</h2>
    </div>

    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="title" label="发票抬头"></el-table-column>
      <el-table-column prop="taxNumber" label="抬头税号"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="bankAccount" label="银行账号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="createat" label="日期" :formatter="formatDate">
      </el-table-column>
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
import { orderBillingList } from "../api/orderBilling";
export default {
  name: "BillingList",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    formatDate(row, column, cellValue) {
      return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadOrderBilling();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadOrderBilling();
    },
    viewHandle(row) {
      this.$router.push({ name: "OrderInfo", params: { id: row.orderId } });
    },
    loadOrderBilling() {
      this.tableLoading = true;
      orderBillingList(this.pagination)
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
    this.loadOrderBilling();
  },
};
</script>
