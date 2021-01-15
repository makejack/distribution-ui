<template>
  <div>
    <div class="toolbar">
      <h2>顾客列表</h2>
    </div>
    <div class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pagination.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="pagination.tel" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="pagination.role" clearable>
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="loadCustomer" :loading="loading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column label="头像" prop="avatarUrl">
        <template slot-scope="scope">
          <el-avatar size="large" :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="手机号" prop="phoneNumber"></el-table-column>
      <el-table-column
        label="角色"
        prop="role"
        :formatter="formatRole"
      ></el-table-column>
      <!-- <el-table-column label="状态" prop="status"></el-table-column> -->
      <el-table-column label="省份" prop="province"></el-table-column>
      <el-table-column label="城市" prop="city"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewCustomerHandler(scope.row)"
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
import { customerList } from "../api/customer";
import { roles } from "../utils/constant";
import { formatRole, formatDatetime } from "../utils/format";

export default {
  name: "Customer",
  data() {
    return {
      loading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        tel: "",
        name: "",
        role: null,
      },
      roles,
    };
  },
  methods: {
    formatDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    formatRole(row, column, cellValue) {
      return formatRole(cellValue);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadCustomer();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadCustomer();
    },
    viewCustomerHandler(row) {
      this.$router.push({ name: "CustomerInfo", params: { id: row.id } });
    },
    loadCustomer() {
      this.loading = true;
      customerList(this.pagination)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.tableData = res.data.result;
            this.totalRows = res.data.totalRows;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loadCustomer();
  },
};
</script>
