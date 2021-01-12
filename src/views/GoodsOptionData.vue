<template>
  <div>
    <div class="toolbar">
      <h2>商品选项值</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="showAddGoodsOptionDataDialog"
          >添加</el-button
        >
        <el-button type="default" @click="returnGoodsOption">返回</el-button>
      </div>
    </div>
    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="value" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="createat" label="日期" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editGoodsOptionData(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteGoodsOptionData(scope.row)"
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
      title="添加商品选项值"
      :visible.sync="dialogFormVisible"
      @closed="dialogClosed"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称" prop="value">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="formLoading"
          @click="addGoodsOptionData"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodsOptionDataList,
  goodsOptionDataAdd,
  goodsOptionDataEdit,
  goodsOptionDataDelete,
} from "@/api/goodsoptiondata";

export default {
  name: "GoodsOptionValue",
  data() {
    return {
      optionId: 0,
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        optionId: 0,
        value: "",
      },
      dialogFormVisible: false,
      formLoading: false,
      form: {
        id: 0,
        optionId: 0,
        value: "",
        description: "",
      },
      rules: {
        value: [{ required: true, message: "请输入值", trigger: "blur" }],
      },
    };
  },
  methods: {
    dateFormat(row) {
      return this.$moment(row.createat).format("YYYY-MM-DD HH:mm:ss");
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadGoodsOptionData();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadGoodsOptionData();
    },
    loadGoodsOptionData() {
      this.tableLoading = true;
      this.pagination.optionId = this.optionId;
      goodsOptionDataList(this.pagination)
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
    dialogClosed() {
      this.$refs["form"].resetFields();
    },
    addGoodsOptionData() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          this.form.optionId = this.optionId;
          if (this.form.id === 0) {
            goodsOptionDataAdd(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogFormVisible = false;
                  this.loadGoodsOptionData();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            goodsOptionDataEdit(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogFormVisible = false;
                  this.loadGoodsOptionData();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          }
        }
      });
    },
    returnGoodsOption() {
      this.$router.push({ name: "GoodsOption" });
    },
    showAddGoodsOptionDataDialog() {
      this.dialogFormVisible = true;
    },
    editGoodsOptionData(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    deleteGoodsOptionData(row) {
      this.$confirm("确认是否删除商品选项值?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsOptionDataDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              this.loadGoodsOptionData();
            }
          });
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.loadGoodsOptionData();
  },
  created() {
    this.optionId = parseInt(this.$route.params.id);
  },
};
</script>