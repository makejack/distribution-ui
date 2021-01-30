<template>
  <el-row :gutter="20">
    <el-col :md="6" :xs="24" :sm="12">
      <el-card class="card" shadow="always">
        <div class="card-header">总销售额</div>
        <countTo
          :startVal="0"
          :endVal="totalSales"
          prefix="¥"
          separator=","
          class="card-number"
        />
      </el-card>
    </el-col>

    <el-col :md="6" :xs="24" :sm="12">
      <el-card class="card" shadow="always">
        <div class="card-header">订单数</div>
        <countTo
          :startVal="0"
          :endVal="statistics.totalOrders"
          class="card-number"
        />
      </el-card>
    </el-col>

    <el-col :md="6" :xs="24" :sm="12">
      <el-card class="card" shadow="always">
        <div class="card-header">待发货</div>
        <countTo
          :startVal="0"
          :endVal="statistics.pendingShipmentCount"
          class="card-number"
        />
      </el-card>
    </el-col>

    <el-col :md="6" :xs="24" :sm="12">
      <el-card class="card" shadow="always">
        <div class="card-header">用户</div>
        <countTo
          :startVal="0"
          :endVal="statistics.totalCustomer"
          class="card-number"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { dataStatistics } from "../api/home";
import countTo from "vue-count-to";

export default {
  name: "HomeStatistics",
  components: { countTo },
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
  computed: {
    totalSales() {
      return this.statistics.totalSales / 100;
    },
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
  font-weight: bold;
  display: block;
  margin: 10px 0px;
}
</style>