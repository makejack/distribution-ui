<template>
  <div>
    <div class="toolbar">
      <h2>合伙人申请设置</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="partnerApplyView()">添加</el-button>
      </div>
    </div>
    <div class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="合伙人角色" prop="partnerRole">
          <el-select
            v-model="pagination.partnerRole"
            clearable
            placeholder="合伙人角色"
          >
            <el-option
              v-for="item in getPartnerRoles()"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            @click="loadPartnerApply"
            :loading="tableLoading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="#" prop="id"></el-table-column>
      <el-table-column
        label="角色"
        prop="partnerRole"
        :formatter="formatPartnerRole"
      ></el-table-column>
      <el-table-column
        label="申请类型"
        prop="applyType"
        :formatter="formatPartnerApplyTypes"
      ></el-table-column>
      <el-table-column label="总数量" prop="totalQuantity"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatTableeDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="partnerApplyView(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="deletePartnerApply(scope.row)"
            >删除</el-button
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
import { applyList, applyDelete } from "../api/partnerApply";
import { roles } from "../utils/constant";
import { formatRole, formatPartnerApplyTypes } from "../utils/format";

export default {
  name: "PartnerApply",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        partnerRole: null,
      },
    };
  },
  methods: {
    getPartnerRoles() {
      return roles;
    },
    formatPartnerRole(row, column, cellValue) {
      return formatRole(cellValue);
    },
    formatPartnerApplyTypes(row, column, cellValue) {
      return formatPartnerApplyTypes(cellValue);
    },
    formatTableeDate(row, column, cellValue) {
      return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadPartnerApply();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadPartnerApply();
    },
    partnerApplyView(id) {
      if (!id) {
        this.$router.push({ name: "PartnerApplyInfo" });
      } else {
        this.$router.push({ name: "PartnerApplyInfo", query: { id } });
      }
    },
    deletePartnerApply(row) {
      this.$confirm("确认是否删除申请条件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          applyDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              this.loadPartnerApply();
            }
          });
        })
        .catch(() => {});
    },
    loadPartnerApply() {
      this.tableLoading = true;
      applyList(this.pagination)
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
    this.loadPartnerApply();
  },
};
</script>
