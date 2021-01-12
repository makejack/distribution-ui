<template>
  <div>
    <div class="toolbar">
      <h2>错误信息</h2>
      <div class="toolbar-btn">
        <el-button @click="returnList">返回</el-button>
      </div>
    </div>
    <div>
      <el-form v-loading="loading" :model="form" ref="form" label-width="120px">
        <el-form-item label="请求地址" prop="url">
          <el-input v-model="form.url" readonly></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method">
          <el-input v-model="form.method" readonly></el-input>
        </el-form-item>
        <el-form-item label="请求内容" prop="body">
          <el-input
            v-model="form.body"
            type="textarea"
            :rows="2"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="错误信息" prop="message">
          <el-input
            v-model="form.message"
            type="textarea"
            :rows="2"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="错误详情" prop="detail">
          <el-input
            v-model="form.detail"
            type="textarea"
            :rows="10"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Ip地址" prop="ipAddress">
          <el-input v-model="form.ipAddress" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createat">
          <el-input :value="formtDate(form.createat)"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { errorGet } from "../api/errorLog";

export default {
  name: "Error",
  data() {
    return {
      id: 0,
      loading: false,
      form: {},
    };
  },
  methods: {
    formtDate(value) {
      return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    returnList() {
      this.$router.push({ name: "ErrorList" });
    },
    loadErrorInfo() {
      this.loading = true;
      errorGet(this.id)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.form = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    if (this.id > 0) this.loadErrorInfo();
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
  },
};
</script>
