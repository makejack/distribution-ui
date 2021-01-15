<template>
  <div>
    <div v-if="visibleSearch" class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="订单状态" prop="status">
          <el-select
            v-model="pagination.status"
            clearable
            placeholder="订单状态"
          >
            <el-option
              v-for="item in getOrderStatus()"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            @click="loadOrderList"
            :loading="tableLoading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column
        label="订单状态"
        prop="orderStatus"
        :formatter="formatOrderStatus"
      ></el-table-column>
      <el-table-column
        label="支付类型"
        prop="paymentType"
        :formatter="formatPaymentType"
      ></el-table-column>
      <el-table-column
        label="支付方式"
        prop="paymentMethod"
        :formatter="formatPaymentMethod"
      ></el-table-column>
      <el-table-column
        label="总费用"
        prop="totalFee"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="优惠金额"
        prop="totalWithDiscount"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="支付金额"
        prop="paymentFee"
        :formatter="formatTableAmount"
      ></el-table-column>
      <el-table-column
        label="支付时间"
        prop="paymentTime"
        :formatter="formatTableeDate"
      ></el-table-column>
      <!-- <el-table-column label="备注" prop="remarks"></el-table-column> -->
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatTableeDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewOrderHandler(scope.row)"
            >查看</el-button
          >
          <el-button
            v-if="scope.row.orderStatus === 0 && visibleDelete"
            type="text"
            @click="deleteHandle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalRows"
        :current-page="pagination.page"
        :page-size="pagination.limit"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { orderList, orderDelete } from "../api/order";
import { orderStatus } from "../utils/constant";
import {
  formatPaymentType,
  formatPaymentMethod,
  formatOrderStatus,
  formatDatetime,
} from "../utils/format";

export default {
  props: {
    customerId: {
      required: false,
      default: null,
    },
    visibleSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    visibleDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        customerId: this.customerId,
        status: null,
      },
    };
  },
  methods: {
    formatAmount(value) {
      return value / 100;
    },
    formatTableeDate(row, column, cellValue) {
      return formatDatetime(cellValue);
    },
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatPaymentType(row) {
      return formatPaymentType(row.paymentType);
    },
    formatPaymentMethod(row) {
      return formatPaymentMethod(row.paymentMethod);
    },
    formatOrderStatus(row) {
      return formatOrderStatus(row.orderStatus);
    },
    getOrderStatus() {
      return orderStatus;
    },
    viewOrderHandler(row) {
      this.$router.push({ name: "OrderInfo", params: { id: row.id } });
    },
    deleteHandle(row) {
      this.$confirm("是否删除无效的订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          orderDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.loadOrderList();
            }
          });
        })
        .catch(() => {});
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadOrderList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadOrderList();
    },
    loadOrderList() {
      this.tableLoading = true;
      orderList(this.pagination).then((res) => {
        this.tableLoading = false;
        if (res.code === 0) {
          this.tableData = res.data.result;
          this.totalRows = res.data.totalRows;
        }
      });
    },
  },
  mounted() {
    this.loadOrderList();
  },
};
</script>
