<template>
  <div>
    <div class="toolbar">
      <h2>装货列表</h2>
    </div>

    <div class="search-toolbar">
      <el-form
        :model="pagination"
        ref="form"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="发货状态" prop="status">
          <el-select
            v-model="pagination.status"
            clearable
            placeholder="发货状态"
          >
            <el-option
              v-for="item in getShippingStatus()"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            @click="searchHandler"
            :loading="tableLoading"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column
        label="收件人姓名"
        prop="address.userName"
      ></el-table-column>
      <el-table-column
        label="联系电话"
        prop="address.telNumber"
      ></el-table-column>
      <el-table-column label="商品数量" prop="quantity"></el-table-column>
      <el-table-column label="快递公司" prop="courierCompany"></el-table-column>
      <el-table-column label="快递单号" prop="trackingNumber"></el-table-column>
      <el-table-column
        label="发货状态"
        prop="shippingStatus"
        :formatter="formatShippingStatus"
      ></el-table-column>
      <el-table-column label="备注" prop="Remarks"></el-table-column>
      <el-table-column
        label="完成时间"
        prop="completeTime"
        :formatter="formatCreateDate"
      ></el-table-column>
      <el-table-column
        label="申请/发货时间"
        prop="shippingTime"
        :formatter="formatCreateDate"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createat"
        :formatter="formatCreateDate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewHandle(scope.row)">查看</el-button>
          <el-button
            v-if="scope.row.address === null"
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
import { shipmentList, shipmentDelete } from "../api/shipment";
import { shippingStatus } from "../utils/constant";
import { formatShippingStatus } from "../utils/format";

export default {
  name: "Shipment",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      totalRows: 0,
      pagination: {
        page: 1,
        limit: 10,
        status: null,
      },
    };
  },
  methods: {
    formatShippingStatus(row, column, cellValue) {
      return formatShippingStatus(cellValue);
    },
    formatCreateDate(row, column, cellValue) {
      if (cellValue)
        return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    sizeChange(val) {
      this.pagination.limit = val;
      this.loadOrderList();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.loadOrderList();
    },
    searchHandler() {
      this.pagination.page = 1;
      this.loadShipmentList();
    },
    viewHandle(row) {
      this.$router.push({ name: "ShipmentInfo", params: { id: row.id } });
    },
    deleteHandle(row) {
      this.$confirm("是否删除无效的装货数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          shipmentDelete(row.id).then((res) => {
            if (res.code === 0) {
              this.loadShipmentList();
            }
          });
        })
        .catch(() => {});
    },
    getShippingStatus() {
      return shippingStatus;
    },
    loadShipmentList() {
      this.tableLoading = true;
      shipmentList(this.pagination)
        .then((res) => {
          this.tableLoading = false;
          if (res.code === 0) {
            this.tableData = res.data.result;
            this.totalRows = res.data.totalRows;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
  },
  mounted() {
    this.loadShipmentList();
  },
};
</script>
