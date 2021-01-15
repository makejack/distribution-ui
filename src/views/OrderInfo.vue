<template>
  <div>
    <div class="toolbar">
      <h2>订单详情</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="editHandle">编辑</el-button>
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
              :value="formatDatetime(order.paymentTime)"
            ></el-input>
          </el-form-item>
          <el-form-item label="退款原因">
            <el-input readonly v-model="order.refundReason"></el-input>
          </el-form-item>
          <el-form-item label="退款时间">
            <el-input
              readonly
              :value="formatDatetime(order.refundTime)"
            ></el-input>
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
            <el-input
              readonly
              :value="formatDatetime(order.cancelTime)"
            ></el-input>
          </el-form-item>
          <el-form-item label="扩展参数">
            <el-input readonly v-model="order.extendParams"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input readonly v-model="order.remarks"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input
              readonly
              :value="formatDatetime(order.createat)"
            ></el-input>
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
      <el-tab-pane v-if="order.billing" label="发票">
        <el-form :model="order.billing" label-width="120px">
          <el-form-item label="发票抬头">
            <el-input v-model="order.billing.title" readonly></el-input>
          </el-form-item>
          <el-form-item label="抬头税号">
            <el-input v-model="order.billing.taxNumber" readonly></el-input>
          </el-form-item>
          <el-form-item label="单位地址">
            <el-input
              v-model="order.billing.companyAddress"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="公司电话">
            <el-input v-model="order.billing.telePhone" readonly></el-input>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-input v-model="order.billing.bankName" readonly></el-input>
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input v-model="order.billing.bankAccount" readonly></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="order.billing.email" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="!order.billing.isInvoiced">
            <el-button type="primary" @click="confirmInvoiced">确认</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="编辑订单" :visible.sync="dialogVisible">
      <el-form :model="form" ref="dialogForm" label-width="120px">
        <el-form-item label="支付类型" prop="paymentType">
          <el-select v-model="form.paymentType">
            <el-option
              v-for="(item, index) in paymentType"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="form.paymentMethod">
            <el-option
              v-for="(item, index) in paymentMethod"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>        
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="formLoading" @click="saveHandle"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderGet, orderEdit } from "../api/order";
import { orderBillingConfirm } from "../api/orderBilling";
import { paymentMethod, paymentType } from "../utils/constant";
import {
  formatPaymentType,
  formatPaymentMethod,
  formatOrderStatus,
  formatShippingStatus,
  formatDatetime,
} from "../utils/format";

export default {
  name: "OrderInfo",
  data() {
    return {
      orderId: 0,
      loading: false,
      btnLoading: false,
      activeName: "base",
      order: {},
      form: {
        id: 0,
        paymentMethod: 0,
        paymentType: 0,
      },
      paymentMethod,
      paymentType,
      formLoading: false,
      dialogVisible: false,
    };
  },
  methods: {
    formatPaymentType,
    formatPaymentMethod,
    formatOrderStatus,
    formatDatetime,
    formatCreateDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatAmount(value) {
      return value / 100;
    },
    formatShippingStatus(row, column, cellvalue) {
      return formatShippingStatus(cellvalue);
    },
    editHandle() {
      this.form = {
        id: this.orderId,
        paymentMethod: this.order.paymentMethod,
        paymentType: this.order.paymentType,
      };
      this.dialogVisible = true;
    },
    saveHandle() {
      this.formLoading = true;
      orderEdit(this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });

            this.loadOrder();
          }
        })
        .catch(() => {
          this.formLoading = false;
        });
    },
    returnOrderList() {
      this.$router.push({ name: "Order" });
    },
    confirmInvoiced() {
      orderBillingConfirm(this.order.billing.id).then((res) => {
        if (res.code === 0) {
          this.order.billing.isInvoiced = true;

          this.$message({
            message: "操作成功",
            type: "success",
          });
        }
      });
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
