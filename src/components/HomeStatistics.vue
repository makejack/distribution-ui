<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="card" shadow="always">
        <div class="card-header">总销售额</div>
        <h1 class="card-number">¥ {{ statistics.totalSales / 100 }}</h1>
      </el-card>
    </el-col>

    <el-col :span="6">
      <el-card class="card" shadow="always">
        <div class="card-header">订单数</div>
        <h1 class="card-number">{{ statistics.totalOrders }}</h1>
      </el-card>
    </el-col>

    <el-col :span="6">
      <el-card class="card" shadow="always">
        <div class="card-header">待发货</div>
        <h1 class="card-number">{{ statistics.pendingShipmentCount }}</h1>
      </el-card>
    </el-col>

    <el-col :span="6">
      <el-card class="card" shadow="always">
        <div class="card-header">用户</div>
        <h1 class="card-number">{{ statistics.totalCustomer }}</h1>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { dataStatistics } from "../api/home";

export default {
  name: "HomeStatistics",
  data() {
    return {
      statistics: {
        totalSales: 0,
        totalOrders: 0,
        pendingShipmentCount: 0,
        totalCustomer: 0,
      },
    };
  },
  methods: {
    getDataStatistics() {
      dataStatistics().then((res) => {
        if (res.code === 0) {
          this.statistics = res.data;
        }
      });
    },
  },
  mounted() {
    this.getDataStatistics();
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  font-size: 16px;
  color: #909399;
}

.card-number {
  font-size: 30px;
  margin: 10px 0px;
}
</style>