<template>
  <div>
    <div class="toolbar">
      <h2>添加订单</h2>
      <div class="toolbar-btn">
        <el-button type="primary" :loading="loading" @click="saveHandle"
          >保存</el-button
        >
        <el-button :loading="loading" @click="$router.push({ name: 'Order' })"
          >返回</el-button
        >
      </div>
    </div>
    <el-form
      v-loading="loading"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="客户微信" prop="customerId">
        <el-select
          v-model="form.customerId"
          filterable
          remote
          placeholder="请输入微信昵称"
          :loading="selectLoading"
          :remote-method="customerFilter"
          @change="customerSelectChange"
        >
          <el-option
            v-for="(item, index) in customerData"
            :key="index"
            :label="item.nickName"
            :value="item.id"
          >
            <div class="option-container">
              <el-avatar :src="item.avatarUrl" size="small"></el-avatar>
              <span class="option-header">{{ item.nickName }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item
        v-if="customer && customer.role === 0"
        label="合伙人角色"
        prop="partnerRole"
      >
        <el-select v-model="form.partnerRole">
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.text"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.remarks"
          maxlength="256"
          show-word-limit
        ></el-input>
      </el-form-item>
      <div v-if="customer && customer.role !== 0">
        <el-form-item label="商品" prop="goods">
          <el-button type="primary" @click="dialogTableVisible = true"
            >选择商品</el-button
          >
        </el-form-item>
        <el-form-item label-width="0px">
          <el-table :data="form.goods" border>
            <!-- <el-table-column
              label="图片"
              prop="thumbnailImageUrl"
            ></el-table-column> -->
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column
              label="价格"
              prop="price"
              :formatter="formatAmount"
            ></el-table-column>
            <el-table-column label="数量" prop="quantity">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  :min="0"
                  :max="100"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-close"
                  circle
                  size="mini"
                  @click="removeGoodsHandle(scope.row)"
                ></el-button
              ></template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
    </el-form>

    <!-- 商品列表 -->
    <goods-table v-model="dialogTableVisible" @select="tableSelectedHandle" />
  </div>
</template>

<script>
import GoodsTable from "@/components/GoodsTable";
import { customerAll } from "@/api/customer";
import { orderAdd } from "@/api/order";
import { roles, paymentType, paymentMethod } from "@/utils/constant";

export default {
  name: "AddOrder",
  components: {
    GoodsTable,
  },
  data() {
    const checkGoods = (rule, value, callback) => {
      if (this.customer && this.customer.role !== 0) {
        if (value.length === 0) {
          return callback(new Error("请选择商品"));
        }
      }
      callback();
    };
    return {
      paymentType,
      paymentMethod,
      roles,
      loading: false,
      selectLoading: false,
      customerData: [],
      dialogTableVisible: false,
      customer: undefined,
      form: {
        customerId: undefined,
        partnerRole: 0,
        paymentType: 0,
        paymentMethod: 0,
        remarks: "",
        goods: [],
      },
      rules: {
        customerId: [
          { required: true, message: "请选择客户微信", trigger: "blur" },
        ],
        goods: [{ validator: checkGoods, trigger: "blur" }],
      },
    };
  },
  methods: {
    formatAmount(row, column, cellValue) {
      return cellValue / 100;
    },
    customerFilter(query) {
      this.selectLoading = true;
      customerAll({ nickName: query })
        .then((res) => {
          this.selectLoading = false;
          if (res.code === 0) {
            this.customerData = res.data;
          }
        })
        .catch(() => {
          this.selectLoading = false;
        });
    },
    customerSelectChange(val) {
      this.customer = this.customerData.find((item) => {
        return item.id === val;
      });
    },
    tableSelectedHandle(data) {
      data.forEach((item) => {
        var anyGoods = this.form.goods.find((g) => {
          return g.id == item.id;
        });
        if (!anyGoods) {
          this.form.goods.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            remarks: "",
          });
        }
      });
    },
    removeGoodsHandle(row) {
      this.form.goods = this.form.goods.filter((item) => {
        return item.id != row.id;
      });
    },
    saveHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          orderAdd(this.form)
            .then((res) => {
              this.loading = false;
              if (res.code === 0) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });

                this.$router.push({ name: "Order" });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.option-container {
  display: flex;
  align-items: center;
}
.option-header {
  margin-left: 10px;
}
</style>