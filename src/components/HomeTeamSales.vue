<template>
  <el-card shadow="always" class="card">
    <div slot="header" class="clearfix">
      <span>Top10 销售团队</span>
    </div>

    <el-table :data="data">
      <el-table-column label="" prop="avatarUrl">
        <template slot-scope="scope">
          <el-avatar :size="46" :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="团队数量" prop="teamQuantity"></el-table-column>
      <el-table-column
        label="团队销售金额"
        prop="teamAmount"
        :formatter="formatAmount"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getTeamSales } from "../api/home";

export default {
  name: "HomeTeamSales",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    formatAmount(row, column, cellValue) {
      return cellValue / 100;
    },
    loadTeamSales() {
      getTeamSales().then((res) => {
        if (res.code === 0) {
          this.data = res.data;
        }
      });
    },
  },
  mounted() {
    this.loadTeamSales();
  },
};
</script>