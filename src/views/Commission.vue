<template>
  <div>
    <div class="toolbar">
      <h2>佣金列表</h2>
    </div>
    <div class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="佣金状态" prop="status">
          <el-select
            v-model="pagination.status"
            clearable
            placeholder="佣金状态"
          >
            <el-option
              v-for="item in getCommissionStatus()"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            @click="loadCommission"
            :loading="tableLoading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
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
      <el-table-column
        label="佣金"
        prop="commission"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="比例"
        prop="percentage"
        :formatter="formatTableAmount"
      ></el-table-column>
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
import { commissionList } from "../api/commission";
import { commissionStatus } from "../utils/constant";
import { formatCommissionStatus } from "../utils/format";

export default {
  name: "Commission",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
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
      if (cellValue)
        return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    getCommissionStatus() {
      return commissionStatus;
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
      commissionList(this.pagination)
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