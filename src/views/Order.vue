<template>
  <div>
    <div class="toolbar">
      <h2>订单列表</h2>
    </div>
    <order-table :visibleSearch="true" :visibleDelete="true" />
  </div>
</template>

<script>
import OrderTable from "../components/OrderTable";

export default {
  name: "Order",
  components: {
    OrderTable,
  },
};
</script>
