<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-header">Login</h1>
      <div class="login-form">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入账号"
              @keyup.enter.native="login"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              v-model="form.pwd"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="login"
            >
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="w-100"
              :loading="loading"
              @click="login"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/auth";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      setToken: "user/set_token",
      setUser: "user/set_userinfo",
    }),
    login() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.loading = true;
        login(this.form)
          .then((res) => {
            this.loading = false;
            if (res.code == 0) {
              this.setToken(res.data.jwtToken);
              this.setUser(res.data.user);
              this.$router.push({ name: "Home" });
            }
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.login-header {
  padding: 20px 0;
  text-align: center;
  margin-bottom: 20px;
}

.login-card {
  width: 380px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
}
</style>