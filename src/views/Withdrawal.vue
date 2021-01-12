<template>
  <div>
    <div class="toolbar">
      <h2>提现列表</h2>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="头像" prop="customer.avatarUrl">
        <template slot-scope="scope">
          <el-avatar
            size="large"
            :src="scope.row.customer.avatarUrl"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="customer.nickName"></el-table-column>
      <el-table-column label="姓名" prop="customer.name"></el-table-column>
      <el-table-column
        label="联系电话"
        prop="customer.phoneNumber"
      ></el-table-column>
      <el-table-column
        label="总金额"
        prop="Total"
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
      <el-table-column label="是否成功" prop="isSuccess">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isSuccess" type="success">提现成功</el-tag>
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
import { withdrawalList } from "../api/withdrawal";

export default {
  name: "Withdrawal",
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
      if (cellValue)
        return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
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
      withdrawalList(this.pagination)
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
