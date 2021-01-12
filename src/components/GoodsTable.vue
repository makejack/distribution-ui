<template>
  <el-dialog title="商品列表" width="80%" :visible.sync="dialogVisible">
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

    <el-table
      border
      :data="tableData"
      v-loading="tableLoading"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        :formatter="priceFormat"
      ></el-table-column>
      <el-table-column prop="isPublished" label="是否发布">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isPublished" type="primary">已发布</el-tag>
          <el-tag v-else type="info">未发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createat" label="日期" :formatter="dateFormat">
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

    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmHandle">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { goodsList } from "../api/goods";

export default {
  name: "GoodsTable",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      dialogVisible: this.value,
      multipleSelection: [],
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
      return this.$moment(row.createat).format("YYYY-MM-DD");
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadGoodsList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadGoodsList();
    },
    confirmHandle() {
      this.$emit("select", this.multipleSelection);
      this.dialogVisible = false;
    },
    selectionChangeHandle(val) {
      this.multipleSelection = val;
    },
    loadGoodsList() {
      this.tableLoading = false;
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
