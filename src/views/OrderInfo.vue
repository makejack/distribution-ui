<template>
  <div>
    <div class="toolbar">
      <h2>订单详情</h2>
      <div class="toolbar-btn">
        <el-button @click="returnOrderList">返回</el-button>
      </div>
    </div>

    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane name="base" label="订单详情">
        <el-form :model="order" label-width="120px">
          <el-form-item label="订单号">
            <el-input readonly v-model="order.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="总费用">
            <el-input readonly :value="formatAmount(order.totalFee)"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额">
            <el-input
              readonly
              :value="formatAmount(order.totalWithDiscount)"
            ></el-input
          ></el-form-item>
          <el-form-item label="订单状态">
            <el-input
              readonly
              :value="formatOrderStatus(order.orderStatus)"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付类型">
            <el-input
              readonly
              :value="formatPaymentType(order.paymentType)"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-input
              readonly
              :value="formatPaymentMethod(order.paymentMethod)"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付金额">
            <el-input readonly :value="order.paymentFee / 100"></el-input>
          </el-form-item>
          <el-form-item label="支付时间">
            <el-input
              readonly
              :value="formatDate(order.paymentTime)"
            ></el-input>
          </el-form-item>
          <el-form-item label="退款原因">
            <el-input readonly v-model="order.refundReason"></el-input>
          </el-form-item>
          <el-form-item label="退款时间">
            <el-input readonly :value="formatDate(order.refundTime)"></el-input>
          </el-form-item>
          <el-form-item label="退款金额">
            <el-input
              readonly
              :value="formatAmount(order.refundFee)"
            ></el-input>
          </el-form-item>
          <el-form-item label="取消原因">
            <el-input readonly v-model="order.cancelReason"></el-input>
          </el-form-item>
          <el-form-item label="取消时间">
            <el-input readonly :value="formatDate(order.cancelTime)"></el-input>
          </el-form-item>
          <el-form-item label="扩展参数">
            <el-input readonly v-model="order.extendParams"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input readonly v-model="order.remarks"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input readonly :value="formatDate(order.createat)"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="items" label="订单商品">
        <el-table :data="order.items" border>
          <el-table-column label="商品名称" prop="goodsName"></el-table-column>
          <el-table-column
            label="标准化名称"
            prop="normalizedName"
          ></el-table-column>
          <el-table-column
            label="商品价格"
            prop="goodsPrice"
            :formatter="formatTableAmount"
          ></el-table-column>
          <el-table-column
            label="优惠价格"
            prop="discountAmount"
            :formatter="formatTableAmount"
          ></el-table-column>
          <!-- <el-table-column label="商品地址" prop="goodsMediaUrl"></el-table-column> -->
          <el-table-column label="数量" prop="quantity"></el-table-column>
          <el-table-column
            label="发货状态"
            prop="shippingStatus"
            :formatter="formatShippingStatus"
          ></el-table-column>
          <el-table-column
            label="发货时间"
            prop="shippingTime"
            :formatter="formatCreateDate"
          ></el-table-column>
          <el-table-column
            label="完成时间"
            prop="completeTime"
            :formatter="formatCreateDate"
          ></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createat"
            :formatter="formatCreateDate"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { orderGet } from "../api/order";
import {
  formatPaymentType,
  formatPaymentMethod,
  formatOrderStatus,
  formatShippingStatus,
} from "../utils/format";

export default {
  name: "OrderInfo",
  data() {
    return {
      orderId: 0,
      loading: false,
      activeName: "base",
      order: {},
    };
  },
  methods: {
    formatCreateDate(row, column, cellValue) {
      return this.formatDate(cellValue);
    },
    formatDate(value) {
      if (value) return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatAmount(value) {
      return value / 100;
    },
    formatPaymentType(data) {
      return formatPaymentType(data);
    },
    formatPaymentMethod(data) {
      return formatPaymentMethod(data);
    },
    formatOrderStatus(data) {
      return formatOrderStatus(data);
    },
    formatShippingStatus(row, column, cellvalue) {
      console.log(cellvalue);
      return formatShippingStatus(cellvalue);
    },
    returnOrderList() {
      this.$router.push({ name: "Order" });
    },
    loadOrder() {
      this.loading = true;
      orderGet(this.orderId).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.order = res.data;
        }
      });
    },
  },
  mounted() {
    this.loadOrder();
  },
  created() {
    this.orderId = this.$route.params.id;
  },
};
</script>
