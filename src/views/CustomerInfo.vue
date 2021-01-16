<template>
  <div>
    <div class="toolbar">
      <h2>顾客信息</h2>
      <div class="toolbar-btn">
        <el-button @click="returnCustomerList">返回</el-button>
      </div>
    </div>

    <el-tabs v-loading="loading" v-model="activeName">
      <el-tab-pane name="info" label="信息">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="头像" prop="avatarUrl">
            <el-avatar :size="120" :src="form.avatarUrl"></el-avatar>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="form.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-input v-model="form.province" readonly></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="form.city" readonly></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input :value="formatRole(form.role)" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createat">
            <el-input :value="formatDatetime(form.createat)" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="assets" label="资产">
        <el-form :model="form.assets" label-width="120px">
          <el-form-item label="总资产" prop="totalAssets">
            <el-input
              :value="formatAmount(form.assets.totalAssets)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="可用金额" prop="availableAmount">
            <el-input
              :value="formatAmount(form.assets.availableAmount)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="佣金" prop="totalCommission">
            <el-input
              :value="formatAmount(form.assets.totalCommission)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="上次更新时间" prop="updateTime">
            <el-input
              :value="formatDatetime(form.assets.updateTime)"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createat">
            <el-input
              :value="formatDatetime(form.assets.createat)"
              readonly
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="order" label="订单" :lazy="true">
        <order-table :customerId="customerId" />
      </el-tab-pane>
      <el-tab-pane name="withdrawal" label="提现记录" :lazy="true">
        <withdrawal-table :customerId="customerId" />
      </el-tab-pane>
      <el-tab-pane name="commission" label="佣金" :lazy="true">
        <commission-table :customerId="customerId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderTable from "../components/OrderTable";
import WithdrawalTable from "../components/WithdrawalTable";
import CommissionTable from "../components/CommissionTable";
import { customerGet } from "../api/customer";
import { formatRole,formatDatetime } from "../utils/format";

export default {
  name: "CustomerInfo",
  components: {
    OrderTable,
    WithdrawalTable,
    CommissionTable,
  },
  data() {
    return {
      customerId: 0,
      activeName: "info",
      loading: false,
      form: {
        assets: {},
      },
    };
  },
  methods: {
    formatRole,
    formatDatetime,
    formatAmount(value) {
      return value / 100;
    },
    returnCustomerList() {
      return this.$router.push({ name: "Customer" });
    },
    loadCustomer() {
      this.loading = true;
      customerGet(this.customerId)
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
    this.loadCustomer();
  },
  created() {
    this.customerId = this.$route.params.id;
  },
};
</script>
