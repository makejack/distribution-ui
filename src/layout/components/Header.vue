<template>
  <div class="header-container">
    <div class="logo">
      <h2>大脉商城后台管理</h2>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      user: "user/userInfo",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      removeToken: "user/remove_token",
    }),
    handleCommand(command) {
      if (command === "changePwd") {
        this.$router.push({ name: "ChnagePwd" });
      } else if (command === "exit") {
        this.removeToken();
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  line-height: 60px;
  float: left;
}
.user {
  float: right;
  line-height: 60px;
}
.el-dropdown {
  cursor: pointer;
}
</style>