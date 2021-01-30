<template>
  <div>
    <div class="toolbar">
      <h2>订单列表</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="addOrder">添加订单</el-button>
      </div>
    </div>
    <order-table :visibleSearch="true" :visibleDelete="true" />
  </div>
</template>

<script>
import OrderTable from "@/components/OrderTable";

export default {
  name: "Order",
  components: {
    OrderTable,
  },
  methods: {
    addOrder() {
      this.$router.push({ name: "AddOrder" });
    },
  },
};
</script>
