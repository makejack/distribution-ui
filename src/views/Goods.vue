<template>
  <div>
    <div class="toolbar">
      <h2>商品列表</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="addGoods">添加</el-button>
      </div>
    </div>

    <div class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pagination.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否发布" prop="isPublished">
          <el-select v-model="pagination.isPublished" clearable>
            <el-option label="已发布" :value="true"></el-option>
            <el-option label="未发布" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            @click="loadGoodsList"
            :loading="tableLoading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="displayOrder" label="排序" width="80px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        :formatter="priceFormat"
         width="100px"
      ></el-table-column>
      <el-table-column prop="isPublished" label="是否发布" width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isPublished" type="primary">已发布</el-tag>
          <el-tag v-else type="info">未发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="cityDiscount"
        label="城市合伙人折扣(%)"
      ></el-table-column>
      <el-table-column
        prop="branchDiscount"
        label="网点合伙人折扣(%)"
      ></el-table-column>
      <el-table-column prop="createat" label="日期" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editGoods(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteGoods(scope.row)"
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
import { goodsList, goodsDelete } from "../api/goods";
import { formatDate } from "../utils/format";

export default {
  name: "Goods",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        isPublished: null,
        name: "",
      },
    };
  },
  methods: {
    priceFormat(row) {
      return row.price / 100;
    },
    dateFormat(row) {
      return formatDate(row.createat);
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadGoodsList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadGoodsList();
    },
    addGoods() {
      this.$router.push({ name: "GoodsInfo" });
    },
    editGoods(row) {
      this.$router.push({ name: "GoodsInfo", query: { id: row.id } });
    },
    deleteGoods(row) {
      this.$confirm("确认是否删除商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              this.loadGoodsList();
            }
          });
        })
        .catch(() => {});
    },
    loadGoodsList() {
      this.tableLoading = true;
      goodsList(this.pagination)
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
    this.loadGoodsList();
  },
};
</script>
