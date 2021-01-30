<template>
  <div>
    <div class="toolbar">
      <h2>退款详情</h2>
      <div class="toolbar-btn">
        <el-button @click="returnHandle">返回</el-button>
      </div>
    </div>

    <el-card shadow="never">
      <div slot="header">
        <span>退货商品</span>
      </div>
      <el-table :data="tableData" border>
        <el-table-column label="商品图片" prop="goodsMediaUrl">
          <template slot-scope="scope">
            <el-image :src="scope.row.goodsMediaUrl" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column
          label="商品价格"
          prop="goodsPrice"
          :formatter="formatTableAmount"
        ></el-table-column>
        <el-table-column label="属性" prop="normalizedName"></el-table-column>
        <el-table-column label="数量" prop="quantity"></el-table-column>
        <el-table-column
          label="实付金额"
          prop="discountAmount"
          :formatter="formatTableAmount"
        ></el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px">
      <div slot="header">
        <span>详情</span>
      </div>
      <el-form v-loading="loading" :model="form" ref="form" label-width="120px">
        <el-form-item label="装货编号">
          {{ form.shipmentId }}
          <el-button type="text" @click="viewShipment">查看</el-button>
        </el-form-item>
        <el-form-item label="买家">
          <!-- <el-avatar v-model="form.avatarUrl" :size="100"></el-avatar> -->
          <el-input v-model="form.customer.nickName" readonly></el-input>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-input
            :value="formatOrderItemStatus(form.status)"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="退款金额">
          <el-input
            :value="formatAmount(form.refundAmount)"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="退款原因">
          <el-input v-model="form.refundReason" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="form.status >= 4" label="快递公司">
          <el-input v-model="form.courierCompany" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="form.status >= 4" label="快递单号">
          <el-col :span="12">
            <el-input v-model="form.trackingNumber" readonly></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="LogisticsQuery">查询</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input :value="formatDate(form.createat)" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-input :value="formatDate(form.auditTime)" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核原因">
          <el-input v-model="form.auditMessage" readonly></el-input>
        </el-form-item>
        <el-form-item label="退款时间">
          <el-input :value="formatDate(form.refundTime)" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="this.form.status === 2">
          <el-button type="primary" @click="dialogVisible = true"
            >确认退货</el-button
          >
          <el-button type="danger" @click="refuseVisible = true"
            >拒绝退货</el-button
          >
        </el-form-item>
        <el-form-item v-else-if="this.form.status === 4">
          <el-button type="primary" @click="confirmHandle">确认收货</el-button>
        </el-form-item>
      </el-form>
    </el-card>

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

    <!-- 退货地址 -->
    <el-dialog
      :visible="dialogVisible"
      title="退货地址设置"
      @closed="closedHandle"
    >
      <el-form
        v-loading="dialogLoading"
        :model="dialogForm"
        ref="dialogForm"
        :rules="rules"
      >
        <el-form-item label="地址" prop="refundAddressId">
          <el-select
            v-model="dialogForm.refundAddressId"
            :loading="selectLoading"
            @visible-change="loadAddress"
          >
            <el-option
              v-for="(item, index) in addresses"
              :key="index"
              :label="item.userName"
              :value="item.id"
            >
              <span>{{ item.userName }} {{ item.telNumber }}</span>
              <span>
                {{ item.provinceName }}/{{ item.cityName }}/{{
                  item.areaName
                }}/{{ item.detailInfo }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="dialogForm.remarks"
            type="textarea"
            :rows="5"
            maxlength="512"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmApplyHandle">确认</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝 -->
    <el-dialog :visible.sync="refuseVisible" title="拒绝原因">
      <el-form
        :model="refuseForm"
        label-width="120px"
        ref="refuseForm"
        :rules="refuseRules"
      >
        <el-form-item label="原因" prop="auditMessage">
          <el-input
            type="textarea"
            :rows="2"
            v-model="refuseForm.auditMessage"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="refuseVisible = false">取消</el-button>
        <el-button type="primary" @click="refuseHandle">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  refundGet,
  refundApplyConfirm,
  refundApplyRefuse,
  refundConfirm,
} from "../api/refund";
import { returnQuery } from "../api/shipping";
import { addressAll } from "../api/address";
import { formatOrderItemStatus } from "../utils/format";

export default {
  name: "Refund",
  data() {
    return {
      loading: false,
      form: {
        customer: {},
      },
      tableData: [],

      refuseVisible: false,
      refuseForm: {
        id: 0,
        auditMessage: "",
      },
      refuseRules: {
        auditMessage: [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
      },

      dialogVisible: false,
      dialogLoading: false,
      dialogForm: {
        id: 0,
        refundAddressId: "",
        remarks: "",
      },
      rules: {
        refundAddressId: [
          { required: true, message: "请选择地址", trigger: "blur" },
        ],
      },
      selectLoading: false,
      addresses: [],

      dialogLogisticsVisible: false,
      logisticsLoading: false,
      logistics: {},
    };
  },
  methods: {
    formatOrderItemStatus,
    formatTableAmount(row, column, cellValue) {
      return this.formatAmount(cellValue);
    },
    formatAmount(val) {
      return val / 100;
    },
    formatDate(val) {
      if (val) return this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    viewShipment() {
      this.$router.push({
        name: "ShipmentInfo",
        params: { id: this.form.shipmentId },
      });
    },
    closedHandle() {
      this.$refs.dialogForm.resetFields();
    },
    confirmApplyHandle() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.dialogLoading = true;
          refundApplyConfirm(this.dialogForm)
            .then((res) => {
              this.dialogLoading = false;
              if (res.code === 0) {
                this.dialogVisible = false;
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
              }
            })
            .catch(() => {
              this.dialogLoading = false;
            });
        }
      });
    },
    loadAddress(val) {
      if (!val) return;
      if (this.addresses.length > 0) return;
      this.selectLoading = true;
      addressAll()
        .then((res) => {
          this.selectLoading = false;
          if (res.code === 0) {
            this.addresses = res.data;
          }
        })
        .catch(() => {
          this.selectLoading = false;
        });
    },
    refuseHandle() {
      this.$refs.refuseForm.validate((valid) => {
        if (valid) {
          refundApplyRefuse(this.refuseForm)
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  message: "提交成功",
                  type: "success",
                });
              }
            })
            .catch(() => {});
        }
      });
    },
    confirmHandle() {
      this.$confirm("退款确认，请确认已收到退款的商品！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          refundConfirm(this.dialogForm.id).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "确认成功，退款到用户钱包中。",
              });

              this.loadRefundDetail(this.dialogForm.id);
            }
          });
        })
        .catch(() => {});
    },
    returnHandle() {
      this.$router.push({ name: "RefundList" });
    },
    LogisticsQuery() {
      this.dialogLogisticsVisible = true;
      this.logisticsLoading = true;
      returnQuery(this.form.goods.id)
        .then((res) => {
          this.logisticsLoading = false;
          if (res.code === 0) {
            this.logistics = JSON.parse(res.data.body);
          }
        })
        .catch(() => {
          this.logisticsLoading = false;
        });
    },
    loadRefundDetail(id) {
      this.loading = true;
      refundGet(id)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.form = res.data;
            this.tableData = [];
            this.tableData.push(res.data.goods);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    var id = this.$route.params.id;
    if (id) {
      var applyId = parseInt(id);
      this.dialogForm.id = applyId;
      this.refuseForm.id = applyId;
      this.loadRefundDetail(id);
    }
  },
};
</script>