<template>
  <div>
    <div class="toolbar">
      <h2>{{ id === 0 ? "添加申请条件" : "编辑申请条件" }}</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="saveHandle">保存</el-button>
        <el-button @click="returnHandle">返回</el-button>
      </div>
    </div>
    <div>
      <el-form
        v-loading="loading"
        :model="form"
        ref="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="合伙人角色" prop="partnerRole">
          <el-select v-model="form.partnerRole">
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请类型" prop="applyType">
          <el-select v-model="form.applyType">
            <el-option
              v-for="(item, index) in partnerApplyTypes"
              :key="index"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐佣金%" prop="referralCommissionRatio">
          <el-input-number
            v-model="form.referralCommissionRatio"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="回购佣金%" prop="repurchaseCommissionRatio">
          <el-input-number
            v-model="form.repurchaseCommissionRatio"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="总数量" prop="totalQuantity">
          <el-input-number
            :min="0"
            v-model="form.totalQuantity"
          ></el-input-number>
        </el-form-item> -->
        <el-form-item label="原价" prop="originalPrice">
          <el-input-number
            :min="0"
            :precision="2"
            v-model="form.originalPrice"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmount">
          <el-input-number
            :min="0"
            :precision="2"
            v-model="form.totalAmount"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品" prop="goods">
          <el-button type="primary" @click="dialogTableVisible = true"
            >添加商品</el-button
          >
        </el-form-item>
        <el-form-item label-width="0px">
          <el-table :data="form.goods" border>
            <!-- <el-table-column
              label="图片"
              prop="thumbnailImageUrl"
            ></el-table-column> -->
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <!-- <el-table-column label="价格" prop="price">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.price"
                  :min="0"
                  :precision="2"
                ></el-input-number>
              </template>
            </el-table-column> -->
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
      </el-form>
    </div>

    <!-- 商品列表 -->
    <goods-table v-model="dialogTableVisible" @select="selectHandle" />
  </div>
</template>

<script>
import { applyGet, applyAdd, applyEdit } from "../api/partnerApply";
import GoodsTable from "../components/GoodsTable.vue";
import { roles, partnerApplyTypes } from "../utils/constant";

export default {
  name: "PartnerApplyInfo",
  components: {
    GoodsTable,
  },
  data() {
    const checkRole = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("散客无法添加条件"));
      } else {
        callback();
      }
    };
    const checkTotalQuantity = (rule, value, callback) => {
      if (value === 0) return callback(new Error("总数量不能为0"));
      callback();
    };
    const checkTotalAmount = (rule, value, callback) => {
      if (value === 0) return callback(new Error("总金额不能为0"));
      callback();
    };
    const checkGoods = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请添加商品"));
      } else {
        callback();
      }
    };
    return {
      roles,
      partnerApplyTypes,
      id: 0,
      loading: false,
      dialogTableVisible: false,
      form: {
        id: 0,
        partnerRole: undefined,
        applyType: 0,
        referralCommissionRatio: 0,
        repurchaseCommissionRatio: 0,
        totalQuantity: 0,
        originalPrice: 0,
        totalAmount: 0,
        goods: [
          //   {
          //     id: 0,
          //     goodsId: 0,
          //     name: "",
          //     price: 0,
          //     thumbnailImageUrl: "",
          //     quantity: 0,
          //   },
        ],
      },
      rules: {
        partnerRole: [
          { required: true, message: "请选择合伙人角色", trigger: "blur" },
          { validator: checkRole, trigger: "blur" },
        ],
        totalQuantity: [
          { required: true, message: "请设置总数量", trigger: "blur" },
          { validator: checkTotalQuantity, trigger: "blur" },
        ],
        totalAmount: [
          {
            required: true,
            message: "请设置总金额",
            trigger: "blur",
          },
          { validator: checkTotalAmount, trigger: "blur" },
        ],
        referralCommissionRatio: [
          { required: true, message: "请设置推荐佣金%", trigger: "blur" },
        ],
        repurchaseCommissionRatio: [
          { required: true, message: "请设置回购佣金%", trigger: "blur" },
        ],
        goods: [{ validator: checkGoods, trigger: "blur" }],
      },
    };
  },
  methods: {
    formatPrice(row, column, cellValue) {
      return cellValue / 100;
    },
    selectHandle(val) {
      val.forEach((item) => {
        var anyGoods = this.form.goods.find((w) => {
          return w.goodsId === item.id;
        });
        if (!anyGoods) {
          this.form.goods.push({
            id: 0,
            goodsId: item.id,
            name: item.name,
            price: item.price / 100,
            thumbnailImageUrl: item.thumbnailImageUrl,
            quantity: 0,
          });
        }
      });
    },
    removeGoodsHandle(row) {
      this.form.goods = this.form.goods.filter((item) => {
        return item.goodsId !== row.goodsId;
      });
    },
    saveHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;

          this.form.totalAmount = this.form.totalAmount * 100;
          this.form.originalPrice = this.form.originalPrice * 100;
          this.form.goods.forEach((item) => {
            item.price = item.price * 100;
          });
          if (this.form.id === 0) {
            applyAdd(this.form)
              .then((res) => {
                this.loading = false;
                if (res.code === 0) {
                  this.returnHandle();
                } else {
                  this.changePricePrecision();
                }
              })
              .catch(() => {
                this.changePricePrecision();
                this.loading = false;
              });
          } else {
            applyEdit(this.form)
              .then((res) => {
                this.loading = false;
                if (res.code === 0) {
                  this.returnHandle();
                } else {
                  this.changePricePrecision();
                }
              })
              .catch(() => {
                this.changePricePrecision();
                this.loading = false;
              });
          }
        }
      });
    },
    changePricePrecision() {
      this.form.totalAmount = this.form.totalAmount / 100;
      this.form.originalPrice = this.form.originalPrice / 100;
      this.form.goods.forEach((item) => {
        item.price = item.price / 100;
      });
    },
    returnHandle() {
      this.$router.push({ name: "PartnerApply" });
    },
    loadPartnerApply() {
      this.loading = true;
      applyGet(this.id)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.form = res.data;

            this.changePricePrecision();
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    if (this.id) {
      this.loadPartnerApply();
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
  },
};
</script>
