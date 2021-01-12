<template>
  <el-menu router>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>商品</span>
      </template>
      <el-menu-item index="/goods">
        <span slot="title">商品列表</span>
      </el-menu-item>
      <el-menu-item index="/goods/option">
        <span slot="title">商品选项</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-shopping-cart-full"></i>
        <span>销售管理</span>
      </template>
      <el-menu-item index="/order">
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/shipment">
        <span slot="title">装货</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>顾客管理</span>
      </template>
      <el-menu-item index="/customer">
        <span slot="title">顾客</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>记录管理</span>
      </template>
      <el-menu-item index="/withdrawal">
        <span slot="title">提现</span>
      </el-menu-item>
      <el-menu-item index="/commission">
        <span slot="title">佣金</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>设置</span>
      </template>
      <el-menu-item index="/partner/apply">
        <span slot="title">合伙人</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-set-up"></i>
        <span>系统</span>
      </template>
      <el-menu-item index="/employee">
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="/log/error">
        <span slot="title">错误日志</span>
      </el-menu-item>
      <el-menu-item index="/log">
        <span slot="title">请求日志</span>
      </el-menu-item>
      <el-menu-item index="/log/sms">
        <span slot="title">短信日志</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>