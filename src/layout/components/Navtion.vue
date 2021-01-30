<template>
  <el-menu router :default-active="activeMenu">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu
      v-for="(item, index) in getMenus"
      :key="index"
      :index="item.title"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item
        v-for="(child, index) in item.children"
        :key="index"
        :index="child.path"
      >
        <span slot="title">{{ child.title }}</span></el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getMenus: "permission/menus",
    }),
    activeMenu() {
      const { path } = this.$route;

      return path;
    },
  },
};
</script>