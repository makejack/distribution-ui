<template>
  <div>
    <div class="toolbar">
      <h2>错误日志</h2>
    </div>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="地址" prop="url"></el-table-column>
      <el-table-column label="请求方式" prop="method"></el-table-column>
      <el-table-column label="错误信息" prop="message"></el-table-column>
      <el-table-column label="IP地址" prop="ipAddress"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewHandler(scope.row)"
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
import { errorList } from "../api/errorLog";

export default {
  name: "ErrorList",
  data() {
    return {
      loading: false,
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
      this.loadLog();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadLog();
    },
    viewHandler(row) {
      this.$router.push({ name: "Error", params: { id: row.id } });
    },
    loadLog() {
      this.loading = true;
      errorList(this.pagination)
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
    this.loadLog();
  },
};
</script>
