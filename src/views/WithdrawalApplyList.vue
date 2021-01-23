<template>
  <div>
    <div class="toolbar">
      <h2>提现申请列表</h2>
      <div class="toolbar-btn">
        <el-button @click="loadWithdrawalApply" :loading="tableLoading"
          >刷新</el-button
        >
      </div>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border>
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
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatTableeDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="agreeHandle(scope.row)"
            >同意</el-button
          >
          <el-button type="text" @click="cancelHandle(scope.row)">
            不同意
          </el-button>
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
import {
  withdrawalApplyList,
  withdrawalAgree,
  withdrawalCancel,
} from "../api/withdrawal";
import { formatDatetime } from "../utils/format";

export default {
  name: "WithdrawalApppList",
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
      dialogVisible: false,
      dialogForm: {
        id: 0,
        status: 0,
        message: "",
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
    agreeHandle(row) {
      this.$confirm("确认同意用户提现请求！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          withdrawalAgree(row.id)
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "用户提现成功!",
                });

                this.loadWithdrawalApply();
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    cancelHandle(row) {
      const data = {
        id: row.id,
        message: "不同意",
      };
      this.$confirm("确认取消用户提现请求！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          withdrawalCancel(data)
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "操作成功",
                });

                this.loadWithdrawalApply();
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadWithdrawalApply();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadWithdrawalApply();
    },
    loadWithdrawalApply() {
      this.tableLoading = true;
      withdrawalApplyList(this.pagination)
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
    this.loadWithdrawalApply();
  },
};
</script>
