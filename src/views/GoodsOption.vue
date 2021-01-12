<template>
  <div>
    <div class="toolbar">
      <h2>商品选项</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="showAddGoodsOptionDialog"
          >添加</el-button
        >
      </div>
    </div>
    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="createat" label="日期" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="viewGoodsOptionData(scope.row)"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="editGoodsOption(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteGoodsOption(scope.row)"
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

    <el-dialog
      title="添加商品选项"
      :visible.sync="dialogFormVisible"
      @closed="dialogClosed"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="formLoading" @click="addGoodsOption"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodsOptionList,
  goodsOptionAdd,
  goodsOptionEdit,
  goodsOptionDelete,
} from "../api/goodsoption";

export default {
  name: "GoodsOption",
  data() {
    return {
      tableLoading: false,
      dialogFormVisible: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        name: "",
      },
      formLoading: false,
      form: {
        id: 0,
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadGoodsOptionList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadGoodsOptionList();
    },
    dateFormat(row) {
      return this.$moment(row.createat).format("YYYY-MM-DD HH:mm:ss");
    },
    loadGoodsOptionList() {
      this.tableLoading = true;
      goodsOptionList(this.pagination)
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
    showAddGoodsOptionDialog() {
      this.dialogFormVisible = true;
    },
    dialogClosed() {
      this.$refs["form"].resetFields();
    },
    addGoodsOption() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.formLoading = false;
          if (this.form.id === 0) {
            goodsOptionAdd(this.form)
              .then((res) => {
                this.formLoading = true;
                if (res.code === 0) {
                  this.dialogFormVisible = false;

                  this.loadGoodsOptionList();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            goodsOptionEdit(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogFormVisible = false;

                  this.loadGoodsOptionList();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          }
        }
      });
    },
    editGoodsOption(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    deleteGoodsOption(row) {
      this.$confirm("确认是否删除商品选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsOptionDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });

              this.loadGoodsOptionList();
            }
          });
        })
        .catch(() => {});
    },
    viewGoodsOptionData(row) {
      this.$router.push({ name: "GoodsOptionData", params: { id: row.id } });
    },
  },
  mounted() {
    this.loadGoodsOptionList();
  },
};
</script>