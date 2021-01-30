<template>
  <div class="forget-container">
    <div class="forget-card">
      <h1 class="forget-header">找回密码</h1>
      <div class="forget-form">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="tel">
            <el-input v-model="form.tel" placeholder="手机号码"> </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="form.code" placeholder="验证码">
              <el-button
                slot="append"
                :disabled="disabled"
                @click="getVerifyCode"
                >{{ text }}</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              maxlength="32"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="w-100"
              :loading="loading"
              @click="resetHandle"
              >确 认</el-button
            >
          </el-form-item>
          <div class="text-center w-100">
            <el-link type="primary" :underline="false" href="#/login"
              >返回登录</el-link
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPwd, verifyCode } from "../api/forget";

export default {
  name: "Forget",
  data() {
    const checkTel = (rule, value, callback) => {
      var regex = /^1\d{10}$/;
      if (!regex.test(value)) {
        return callback(new Error("请输入正确的手机号"));
      }
      callback();
    };
    return {
      disabled: false,
      time: 60,
      text: "获取验证码",
      loading: false,
      form: {
        tel: "",
        code: "",
        password: "",
      },
      rules: {
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    getVerifyCode() {
      this.$refs.form.validateField("tel", (err) => {
        if (err) return;
        this.disabled = true;
        verifyCode({ tel: this.form.tel })
          .then((res) => {
            if (res.code === 0) {
              this.$message({
                message: "验证码已发送",
                type: "success",
              });

              this.timer();
            }
          })
          .catch(() => {
            this.disabled = false;
          });
      });
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.text = this.time + " 秒后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 60;
        this.text = "获取验证码";
        this.disabled = false;
      }
    },
    resetHandle() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        resetPwd(this.form)
          .then((res) => {
            this.loading = false;
            if (res.code === 0) {
              this.$message({
                message: "修改成功",
                type: "success",
              });

              this.$refs.form.resetFields();
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
.forget-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.forget-header {
  padding: 20px 0;
  text-align: center;
  margin-bottom: 20px;
}
.forget-card {
  width: 380px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
}
</style>