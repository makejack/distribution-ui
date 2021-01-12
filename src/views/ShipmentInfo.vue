<template>
  <div>
    <div class="toolbar">
      <h2>装货信息</h2>
      <div class="toolbar-btn">
        <el-button type="primary" :loading="loading" @click="loadShipment"
          >刷新</el-button
        >
        <el-button @click="returnShipmentHandler">返回</el-button>
      </div>
    </div>

    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="基本信息" name="base">
        <el-form :model="shipment" label-width="120px">
          <el-form-item label="重量" prop="totalWeight">
            <el-input v-model="shipment.totalWeight" readonly></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-input v-model="shipment.quantity" readonly></el-input>
          </el-form-item>
          <el-form-item label="快递公司" prop="courierCompany">
            <el-input v-model="shipment.courierCompany" readonly></el-input>
          </el-form-item>
          <el-form-item label="快递公司Code" prop="courierCompanyCode">
            <el-input v-model="shipment.courierCompanyCode" readonly></el-input>
          </el-form-item>
          <el-form-item label="快递单号" prop="trackingNumber">
            <el-col :span="12"
              ><el-input v-model="shipment.trackingNumber" readonly></el-input
            ></el-col>
            <el-col :span="12">
              <el-button @click="trackingNumberQueryHandler">查询</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="发货状态" prop="shippingStatus">
            <el-input
              :value="formatShippingStatus(shipment.shippingStatus)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="申请/发货时间" prop="shippingTime">
            <el-input
              :value="formatDate(shipment.shippingTime)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="完成时间" prop="completeTime">
            <el-input
              :value="formatDate(shipment.completeTime)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="shipment.remarks" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createat">
            <el-input
              :value="formatDate(shipment.createat)"
              readonly
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="出货商品" name="goods">
        <el-table :data="shipment.items" border>
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
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createat"
            :formatter="formatCreateDate"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="shipment.address" label="送货地址" name="address">
        <el-form :model="shipment.address" label-width="120px">
          <el-form-item label="收件人姓名" prop="userName">
            <el-input v-model="shipment.address.userName" readonly></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="telNumber">
            <el-input v-model="shipment.address.telNumber" readonly></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="postalCode">
            <el-input v-model="shipment.address.postalCode" readonly></el-input>
          </el-form-item>
          <el-form-item label="省" prop="provinceName">
            <el-input
              v-model="shipment.address.provinceName"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="市" prop="cityName">
            <el-input v-model="shipment.address.cityName" readonly></el-input>
          </el-form-item>
          <el-form-item label="县/区" prop="areaName">
            <el-input v-model="shipment.address.areaName" readonly></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailInfo">
            <el-input v-model="shipment.address.detailInfo" readonly></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = true"
              >设置单号</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="物流信息" :visible.sync="dialogLogisticsVisible">
      <div v-loading="logisticsLoading">
        <el-timeline v-if="logistics.status === '200'" :reverse="false">
          <el-timeline-item
            v-for="(item, index) in logistics.data"
            :key="index"
            :timestamp="item.time"
          >
            {{ item.context }}
          </el-timeline-item>
        </el-timeline>
        <p v-else>{{ logistics.message }}</p>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="dialogLogisticsVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="设置快递单号"
      :visible.sync="dialogFormVisible"
      @closed="dialogClosed"
    >
      <el-form ref="form" :model="shipment" :rules="rules" label-width="120px">
        <el-form-item label="快递公司" prop="courierCompanyCode">
          <el-select
            v-model="shipment.courierCompanyCode"
            placeholder="请选择快递公司"
            class="w-100"
          >
            <el-option
              v-for="(item, index) in getGourierCompanys()"
              :key="index"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="trackingNumber">
          <el-input
            v-model="shipment.trackingNumber"
            placeholder="请输入快递单号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="formLoading"
          @click="setTrackingNumberHandler"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { shipmentGet, shipmentSetTrackingNumber } from "../api/shipment";
import { trackingNumberQuery } from "../api/shipping";
import { courierCompanys } from "../utils/constant";
import { formatShippingStatus } from "../utils/format";

export default {
  name: "ShipmentInfo",
  data() {
    return {
      shipmentId: 0,
      loading: false,
      activeName: "base",
      shipment: {
        address: {},
      },
      logisticsLoading: false,
      dialogLogisticsVisible: false,
      logistics: "",
      dialogFormVisible: false,
      formLoading: false,
      rules: {
        courierCompanyCode: [
          { required: true, message: "请选择快递公司", trigger: "blur" },
        ],
        trackingNumber: [
          { required: true, message: "请输入快递单号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    formatTableAmount(row, column, cellValue) {
      return cellValue / 100;
    },
    formatCreateDate(row, column, cellValue) {
      return this.formatDate(cellValue);
    },
    formatDate(value) {
      if (value) return this.$moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    formatShippingStatus(value) {
      return formatShippingStatus(value);
    },
    getGourierCompanys() {
      return courierCompanys;
    },
    returnShipmentHandler() {
      this.$router.push({ name: "Shipment" });
    },
    trackingNumberQueryHandler() {
      if (this.shipment.trackingNumber) {
        this.dialogLogisticsVisible = true;
        this.logisticsLoading = true;
        trackingNumberQuery(this.shipmentId)
          .then((res) => {
            this.logisticsLoading = false;
            if (res.code === 0) {
              this.logistics = JSON.parse(res.data.body);
            }
          })
          .catch(() => {
            this.logisticsLoading = false;
          });
      } else {
        this.$message({
          message: "请设置快递单号",
          type: "warning",
        });
      }
    },
    dialogClosed() {
      this.$refs["form"].resetFields();
    },
    setTrackingNumberHandler() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          //搜索快递名称
          var courierCompany = courierCompanys.find((item) => {
            return item.key === this.shipment.courierCompanyCode;
          });
          const param = {
            id: this.shipment.id,
            courierCompany: courierCompany.name,
            courierCompanyCode: this.shipment.courierCompanyCode,
            trackingNumber: this.shipment.trackingNumber,
          };
          shipmentSetTrackingNumber(param)
            .then((res) => {
              this.formLoading = false;
              if (res.code === 0) {
                this.dialogFormVisible = false;

                this.$message({
                  message: "快递单号设置成功",
                  type: "success",
                });
              }
            })
            .catch(() => {
              this.formload = false;
            });
        }
      });
    },
    loadShipment() {
      this.loading = true;
      shipmentGet(this.shipmentId)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.shipment = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loadShipment();
  },
  created() {
    this.shipmentId = this.$route.params.id;
  },
};
</script>
