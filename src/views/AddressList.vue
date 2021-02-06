<template>
  <div>
    <div class="toolbar">
      <h2>地址列表</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="addHandle">添加</el-button>
      </div>
    </div>

    <el-table border :data="tableData" v-loading="tableLoading">
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="telNumber" label="手机号"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column prop="areaName" label="区/县"></el-table-column>
      <el-table-column prop="detailInfo" label="详细地址"></el-table-column>
      <el-table-column prop="isDefault" label="是否默认">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDefault"
            @change="defaultChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandle(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteHandle(scope.row)"
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
      :title="form.id === 0 ? '添加地址' : '编辑地址'"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="handleClose"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telNumber">
          <el-input v-model="form.telNumber" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="市/县/区" prop="areaCode">
          <v-distpicker
            :province="form.provinceName"
            :city="form.cityName"
            :area="form.areaName"
            @selected="onSelected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailInfo">
          <el-input
            v-model="form.detailInfo"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否默认" prop="isDefault">
          <el-switch v-model="form.isDefault"> </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveHandle" :loading="formLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addressList,
  addressDelete,
  addressCreate,
  addressEdit,
  addressChangeDefault,
} from "../api/address";
import VDistpicker from "v-distpicker";

export default {
  name: "AddressList",
  components: {
    VDistpicker,
  },
  data() {
    var checkAddress = (rule, value, callback) => {
      if (isNaN(value)) {
        return callback(new Error("请选择省/县/区"));
      }
      callback();
    };
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
      },

      dialogVisible: false,
      formLoading: false,
      form: {
        id: 0,
        isDefault: false,
        userName: "",
        telNumber: "",
        postalCode: 0,
        provinceCode: NaN,
        cityCode: NaN,
        areaCode: NaN,
        provinceName: "",
        cityName: "",
        areaName: "",
        detailInfo: "",
      },
      rules: {
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        telNumber: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
        ],
        areaCode: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur",
          },
          { validator: checkAddress, trigger: "blur" },
        ],
        detailInfo: [
          {
            required: true,
            message: "详细地址不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadAddress();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadAddress();
    },
    handleClose() {
      this.form = {
        id: 0,
      };
      // this.$refs.form.resetFields();
    },
    onSelected(data) {
      this.form.provinceCode = parseInt(data.province.code);
      this.form.provinceName = data.province.value;
      this.form.cityCode = parseInt(data.city.code);
      this.form.cityName = data.city.value;
      this.form.areaCode = parseInt(data.area.code);
      this.form.areaName = data.area.value;
    },
    defaultChange(row) {
      addressChangeDefault(row.id).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });

          this.tableData.forEach((item) => {
            if (item.id !== row.id) {
              if (item.isDefault) item.isDefault = false;
            }
          });
        }
      });
    },
    addHandle() {
      this.dialogVisible = true;
    },
    editHandle(row) {
      this.form = JSON.parse(JSON.stringify(row));
      // this.form = {
      //   id: row.id,
      //   isDefault: row.isDefault,
      //   userName: row.userName,
      //   telNumber: row.telNumber,
      //   postalCode: row.postalCode,
      //   provinceCode: row.provinceCode,
      //   cityCode: row.cityCode,
      //   areaCode: row.areaCode,
      //   provinceName: row.provinceName,
      //   cityName: row.cityName,
      //   areaName: row.areaName,
      //   detailInfo: row.detailInfo,
      // };
      this.dialogVisible = true;
    },
    deleteHandle(row) {
      this.$confirm("确认是否删除地址?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          addressDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              this.loadAddress();
            }
          });
        })
        .catch(() => {});
    },
    saveHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (this.form.id === 0) {
            addressCreate(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogVisible = false;
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.loadAddress();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            addressEdit(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogVisible = false;
                  this.$message({
                    message: "编辑成功",
                    type: "success",
                  });

                  this.loadAddress();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          }
        }
      });
    },
    loadAddress() {
      this.tableLoading = true;
      addressList(this.pagination)
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
    this.loadAddress();
  },
};
</script>
