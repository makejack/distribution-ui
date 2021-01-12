<template>
  <div>
    <div class="toolbar">
      <h2>请求响应日志</h2>
       <div class="toolbar-btn">
        <el-button @click="loadLogList">刷新</el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column label="地址" prop="url"></el-table-column>
      <el-table-column label="请求方式" prop="method"></el-table-column>
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
import { logList } from "../api/requestResponseLog";

export default {
  name: "LogList",
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
      this.loadLogList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadLogList();
    },
    viewHandler(row) {
      this.$router.push({ name: "Log", params: { id: row.id } });
    },
    loadLogList() {
      this.loading = true;
      logList(this.pagination)
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
    this.loadLogList();
  },
};
</script>
