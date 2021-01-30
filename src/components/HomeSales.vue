<template>
  <el-card shadow="always" class="card">
    <div slot="header" class="clearfix">
      <span>销售额</span>
      <el-button-group class="btn-group">
        <el-button type="text" size="small" @click="daySales">今天</el-button>
        <el-button type="text" size="small" @click="weekSales">本周</el-button>
        <el-button type="text" size="small" @click="monthSales">本月</el-button>
        <el-button type="text" size="small" @click="yearSales">本年</el-button>
        <el-button type="text" size="small" v-popover:popover>自定义</el-button>
        <el-popover
          ref="popover"
          trigger="click"
          placement="bottom"
          v-model="visible"
        >
          <el-date-picker
            type="daterange"
            v-model="dateRange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button type="primary" @click="btnCustomizeSales">确认</el-button>
        </el-popover>
      </el-button-group>
    </div>
    <div id="myChart"></div>
  </el-card>
</template>

<script>
import { getSales } from "../api/home";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "HomeSales",
  data() {
    return {
      visible: false,
      dateRange: "",
      salesWhere: {
        type: "Month",
        startDate: null,
        endDate: null,
      },
      xData: [],
      data: [],
    };
  },
  methods: {
    btnCustomizeSales() {
      this.visible = false;

      this.salesWhere.startDate = this.dateRange[0];
      this.salesWhere.endDate = this.dateRange[1];

      this.customizeSales();
    },
    daySales() {
      this.salesWhere.type = "Day";
      this.loadSales((key) => {
        return key + " 小时";
      });
    },
    weekSales() {
      this.salesWhere.type = "Week";
      this.loadSales((key) => {
        return this.$moment(key).format("YYYY-MM-DD");
      });
    },
    monthSales() {
      this.salesWhere.type = "Month";
      this.loadSales((key) => {
        return this.$moment(key).format("YYYY-MM-DD");
      });
    },
    yearSales() {
      this.salesWhere.type = "Year";
      this.loadSales((key) => {
        return key + " 月";
      });
    },
    customizeSales() {
      this.salesWhere.type = "Customize";
      this.loadSales((key) => {
        return this.$moment(key).format("YYYY-MM-DD");
      });
    },
    loadSales(callback) {
      getSales(this.salesWhere).then((res) => {
        if (res.code === 0) {
          this.xData = [];
          this.data = [];
          res.data.forEach((item) => {
            this.xData.push(callback(item.key));
            this.data.push(item.amount / 100);

            this.initChart();
          });
        }
      });
    },
    initChart() {
      var myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: { text: "销售量趋势" },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "销售额",
            type: "bar",
            barWidth: "60%",
            data: this.data,
          },
        ],
      });
    },
  },
  mounted(){
      this.monthSales();
  }
};
</script>

<style lang="scss" scoped>

.btn-group {
  float: right;
}

.btn-group .el-button {
  padding: 3px 5px;
}

#myChart {
  width: 100%;
  height: 360px;
}

.el-popover__reference-wrapper {
  height: 20px;
}
</style>