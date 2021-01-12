<template>
  <div>
    <div class="toolbar">
      <h2>员工列表</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="addEmployee">添加</el-button>
      </div>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="账号" prop="name"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column
        label="角色"
        prop="role"
        :formatter="formaTemployeeRole"
      ></el-table-column>
      <el-table-column label="手机号码" prop="tel"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editorHandle(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="deleteHandle(scope.row)"
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
      :title="form.id === 0 ? '添加员工' : '编辑员工'"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="form.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input
            v-model="form.tel"
            :maxlength="11"
            placeholder="手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in getEmployeeRoles()"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.id === 0" label="密码" prop="pwd">
          <el-input v-model="form.pwd" show-password></el-input>
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
  employeeList,
  employeeDelete,
  employeeAdd,
  EmployeeEdit,
} from "../api/employee";
import { employeeRoles } from "../utils/constant";
import { formatTemployeeRole } from "../utils/format";

export default {
  name: "Employee",
  data() {
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
        name: "",
        nickName: "",
        pwd: "",
        role: 0,
        tel: "",
      },
      rules: {
        name: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "账号长度不正确 6-32",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码长度不正确", trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "密码长度不正确 6-32",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    formatDate(row, column, cellValue) {
      return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    formaTemployeeRole(row, column, cellValue) {
      return formatTemployeeRole(cellValue);
    },
    addEmployee() {
      this.dialogVisible = true;
    },
    editorHandle(row) {
      this.form = {
        id: row.id,
        name: row.name,
        nickName: row.nickName,
        role: row.role,
        tel: row.tel,
      };

      this.dialogVisible = true;
    },
    deleteHandle(row) {
      this.$confirm("确认是否删除员工?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          employeeDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              this.loadEmployee();
            }
          });
        })
        .catch(() => {});
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadCustomer();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadCustomer();
    },
    loadEmployee() {
      this.tableLoading = true;
      employeeList(this.pagination)
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
    getEmployeeRoles() {
      return employeeRoles;
    },
    handleClosed() {
      this.$refs.form.resetFields();
    },
    saveHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (this.form.id === 0) {
            employeeAdd(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogVisible = false;

                  this.loadEmployee();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            EmployeeEdit(this.form)
              .then((res) => {
                this.formLoading = false;
                if (res.code === 0) {
                  this.dialogVisible = false;

                  this.loadEmployee();
                }
              })
              .catch(() => {
                this.formLoading = false;
              });
          }
        }
      });
    },
  },
  mounted() {
    this.loadEmployee();
  },
};
</script>
