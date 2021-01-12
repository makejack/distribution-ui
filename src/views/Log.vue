<template>
  <div>
    <div class="toolbar">
      <h2>请求信息</h2>
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
        <el-form-item label="头部内容" prop="headers">
          <el-input
            v-model="form.headers"
            type="textarea"
            :rows="10"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="请求内容" prop="requestBody">
          <el-input
            v-model="form.requestBody"
            type="textarea"
            :rows="10"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="响应内容" prop="responseBody">
          <el-input
            v-model="form.responseBody"
            type="textarea"
            :rows="10"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createat">
          <el-input :value="formtDate(form.createat)"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { logGet } from "../api/requestResponseLog";

export default {
  name: "Log",
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
      this.$router.push({ name: "LogList" });
    },
    loadLogInfo() {
      this.loading = true;
      logGet(this.id)
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
    if (this.id > 0) {
      this.loadLogInfo();
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
  },
};
</script>
