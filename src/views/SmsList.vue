<template>
  <div>
    <div class="toolbar">
      <h2>短信日志</h2>
    </div>
    <el-table v-loading="loading" :data="tableData" border>
      <el-table-column label="手机号" prop="tel"></el-table-column>
      <el-table-column label="Code" prop="code"></el-table-column>
      <el-table-column label="MsgId" prop="msgId"></el-table-column>
      <el-table-column label="Time" prop="time"></el-table-column>
      <el-table-column label="Message" prop="message"></el-table-column>
      <el-table-column label="Errormsg" prop="errorMsg"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatDate"
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
import { smsList } from "../api/smsLog";
import { formatDatetime } from "../utils/format";

export default {
  name: "SmsList",
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
      return formatDatetime(cellValue);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadSms();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadSms();
    },
    loadSms() {
      this.loading = true;
      smsList(this.pagination)
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
    this.loadSms();
  },
};
</script>
