<template>
  <div>
    <div class="toolbar">
      <h2>退款详情</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="confirmHandle">确认</el-button>
        <el-button @click="returnHandle">返回</el-button>
      </div>
    </div>

    <el-form v-loading="loading" :model="form" ref="form" label-width="120px">
      <el-form-item label="商品主图">
        <el-avatar
          :size="100"
          :src="form.goodsMediaUrl"
          shape="square"
        ></el-avatar>
      </el-form-item>
      <el-form-item label="买家">
        <!-- <el-avatar v-model="form.avatarUrl" :size="100"></el-avatar> -->
        <el-input v-model="form.customerName" readonly></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsName" readonly></el-input>
      </el-form-item>
      <el-form-item label="标准化名称">
        <el-input v-model="form.normalizedName" readonly></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.discountAmount" readonly></el-input>
      </el-form-item>
      <el-form-item label="退款金额">
        <el-input v-model="form.refundAmount" readonly></el-input>
      </el-form-item>
      <el-form-item label="退款状态">
        <el-input
          :value="formatRefundStatus(form.refundStatus)"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="退款原因">
        <el-input
          v-model="form.refundReason"
          type="textarea"
          :rows="10"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item v-if="form.refundStatus === 4" label="快递公司">
        <el-input v-model="form.courierCompany" readonly></el-input>
      </el-form-item>
      <el-form-item v-if="form.refundStatus === 4" label="快递单号">
        <el-col :span="12">
          <el-input v-model="form.trackingNumber" readonly></el-input>
        </el-col>
        <el-col :span="12">
          <el-button @click="LogisticsQuery">查询</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-input :value="formatDate(form.refundApplyTime)" readonly></el-input>
      </el-form-item>
      <el-form-item label="退款时间">
        <el-input :value="formatDate(form.refundTime)" readonly></el-input>
      </el-form-item>
    </el-form>

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
  </div>
</template>

<script>
import { refundGet, refundApplyConfirm, refundConfirm } from "../api/refund";
import { returnQuery } from "../api/shipping";
import { addressAll } from "../api/address";
import { formatRefundStatus } from "../utils/format";

export default {
  name: "Refund",
  data() {
    return {
      loading: false,
      form: {},

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
    formatRefundStatus,
    formatDate(val) {
      if (val) return this.$moment(val).format("YYYY-MM-DD HH:mm:ss");
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
    confirmHandle() {
      // 退款申请
      if (this.form.refundStatus === 2) {
        this.dialogVisible = true;
      } else if (this.form.refundStatus === 4) {
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
      } else {
        this.$message({
          message: "未知操作",
          type: "warning",
        });
      }
    },
    returnHandle() {
      this.$router.push({ name: "RefundList" });
    },
    LogisticsQuery() {
      this.dialogLogisticsVisible = true;
      this.logisticsLoading = true;
      returnQuery(this.dialogForm.id)
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
      this.dialogForm.id = parseInt(id);
      this.loadRefundDetail(id);
    }
  },
};
</script>