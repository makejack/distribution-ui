<template>
  <div v-loading="loading">
    <div class="toolbar">
      <h2>{{ goodsId === 0 ? "新增商品" : "编辑商品" }}</h2>
      <div class="toolbar-btn">
        <el-button type="primary" @click="saveGoodsHandler" :loading="disabled"
          >保存</el-button
        >
        <el-button type="default" @click="returnGoodsList">返回</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base">
        <el-form
          :model="goods"
          ref="baseForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goods.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <quill-editor
              ref="myQuillEditor"
              v-model="goods.description"
              :options="quillEditorOption"
              @change="onEditorChange($event)"
            />
            <el-upload
              action="#"
              :before-upload="beforetImageUpload"
              :http-request="uploadEditorImage"
              style="display: none"
            >
              <el-button id="editImgUpload"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品主图" prop="thumbnailImageId">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :before-upload="beforetImageUpload"
              :http-request="uploadThumbnailImage"
            >
              <img
                v-if="goods.thumbnailImageUrl"
                :src="goods.thumbnailImageUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品图片" prop="thumbnailImageId">
            <el-upload
              action="#"
              list-type="picture-card"
              :file-list="goods.goodsMedias"
              :before-upload="beforetImageUpload"
              :on-preview="handlePictureCardPreview"
              :http-request="uploadGoodsMedia"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="显示排序" prop="displayOrder">
            <el-input-number
              v-model="goods.displayOrder"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="城市合伙人折扣" prop="cityDiscount">
            <el-input-number
              v-model="goods.cityDiscount"
              :min="0"
            ></el-input-number>
            <span class="text-secondary"> 50 = 5折</span>
          </el-form-item>
          <el-form-item label="网点合伙人折扣" prop="branchDiscount">
            <el-input-number
              v-model="goods.branchDiscount"
              :min="0"
            ></el-input-number>
            <span class="text-secondary"> 50 = 5折</span>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch v-model="goods.isPublished"></el-switch>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品选项" name="option">
        <el-row>
          <el-col :span="4"
            ><label class="el-form-item__label" style="width: 120px"
              >商品组合</label
            >
          </el-col>
          <el-col :span="20">
            <el-col :span="11">
              <el-select v-model="selectGoodsOptionId">
                <el-option
                  v-for="item in goodsOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <el-button type="default" @click="addGoodsOption"
                >添加选项</el-button
              >
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"
            ><label class="el-form-item__label" style="width: 120px"
              >商品选项</label
            >
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="24">
                <el-table :data="tableGoodsOptions">
                  <el-table-column
                    label="选项名称"
                    prop="name"
                  ></el-table-column>
                  <el-table-column label="选项值" prop="datas">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.values" multiple>
                        <el-option
                          v-for="item in getGoodsOptionDatas(scope.row)"
                          :key="item.id"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-close"
                        size="mini"
                        circle
                        @click="removeGoodsOption(scope.row)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button @click="generateVariations">生成组合</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <label class="el-form-item__label" style="width: 120px"
              >商品组合</label
            ></el-col
          >
          <el-col :span="20">
            <el-table :data="goods.variations">
              <el-table-column label="名称" prop="normalizedName">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.normalizedName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="价格" prop="price">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.price"
                    controls-position="right"
                    :precision="2"
                    :min="0"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="库存" prop="stockQuantity">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.stockQuantity"
                    controls-position="right"
                    :min="0"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    icon="el-icon-close"
                    circle
                    size="mini"
                    @click="removeGoodsVariation(scope.$index)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
import { quillEditor } from "vue-quill-editor";
import http from "../utils/http";
import { uploadImg } from "@/api/media";
import { goodsAdd, goodsGet, goodsEdit } from "../api/goods";
import { goodsOptionAll } from "@/api/goodsoption";
import { goodsOptionDataAll } from "@/api/goodsoptiondata";

export default {
  name: "GoodsInfo",
  components: {
    quillEditor,
  },
  data() {
    return {
      goodsId: 0,
      loading: false,
      disabled: false,
      dialogVisible: false,
      dialogImageUrl: "",
      activeName: "base",
      quillEditorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ align: [] }], //对齐方式
            ["image"], //上传图片、上传视频
          ],
        },
      },
      goodsOptions: [],
      selectGoodsOptionId: "",
      tableGoodsOptions: [
        // {
        //   id: 0,
        //   name: "",
        //   values: [],
        // },
      ],
      goodsOptionData: [],
      goods: {
        name: "",
        description: "",
        price: 0,
        thumbnailImageId: 0,
        thumbnailImageUrl: "",
        isPublished: false,
        goodsMediaIds: [],
        goodsMedias: [],
        options: [
          // {
          //   id: 0,
          //   name: "",
          //   values: [
          //     {
          //       value: "",
          //       displayOrder: 0,
          //     },
          //   ],
          // },
        ],
        variations: [
          // {
          //   id: 0,
          //   normalizedName: "",
          //   price: 0,
          //   stockQuantity: 0,
          //   optionCombinations: [
          //     {
          //       optionId: 0,
          //       value: "",
          //       displayOrder: 0,
          //     },
          //   ],
          // },
        ],
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onEditorChange({ html }) {
      this.goods.description = html;
    },
    uploadThumbnailImage(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      this.loading = true;
      uploadImg(formData)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.goods.thumbnailImageId = res.data.id;
            this.goods.thumbnailImageUrl = res.data.url;
          }
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("请求失败");
        });
    },
    uploadGoodsMedia(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      this.loading = true;
      uploadImg(formData)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            this.goods.goodsMediaIds.push(res.data.id);

            // res.data.url = "/api/" + res.data.url;

            // this.goods.goodsMedias.push(res.data);
          }
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("请求失败");
        });
    },
    beforetImageUpload(file) {
      const imgTypes = ["image/jpeg", "image/png"];
      const isImg = imgTypes.indexOf(file.type) !== -1;
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImg) {
        this.$message.error("上传头像图片只能是 JPG PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }

      return isImg && isLt5M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imageHandler(state) {
      if (state) {
        let fileInput = document.getElementById("editImgUpload");
        fileInput.click();
      }
    },
    uploadEditorImage(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      this.loading = true;
      uploadImg(formData)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            var addRanage = this.$refs.myQuillEditor.quill.getSelection();
            this.$refs.myQuillEditor.quill.insertEmbed(
              addRanage !== null ? addRanage.index : 0,
              "image",
              res.data.url
            ); // 调用编辑器的 insertEmbed 方法，插入URL
          }
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("请求失败");
        });
    },
    // 商品选项
    addGoodsOption() {
      const optionId = this.selectGoodsOptionId;
      var isAdd = this.tableGoodsOptions.find((item) => {
        return item.id == optionId;
      });
      if (isAdd) {
        this.$message({
          message: "商品选项已添加",
          type: "warning",
        });
        return;
      }
      var option = this.goodsOptions.find((item) => {
        return item.id === optionId;
      });
      const row = {
        id: option.id,
        name: option.name,
        values: [],
      };
      this.tableGoodsOptions.push(row);
    },
    getGoodsOptionDatas(row) {
      return this.goodsOptionData.filter((item) => {
        if (item.optionId === row.id) return item;
      });
    },
    removeGoodsOption(row) {
      this.tableGoodsOptions = this.tableGoodsOptions.filter((item) => {
        return item.id !== row.id;
      });
    },
    removeGoodsVariation(index) {
      this.goods.variations = this.goods.variations.filter((item, i) => {
        return i !== index;
      });
    },
    generateVariations() {
      if (this.tableGoodsOptions.length === 0) {
        this.$message({
          message: "请选择商品选项",
          type: "warning",
        });
        return;
      }
      const nullValues = this.tableGoodsOptions.find((item) => {
        return item.values.length === 0;
      });
      if (nullValues) {
        this.$message({
          message: "请选择商品选项值",
          type: "warning",
        });
        return;
      }

      var allOption = [];
      this.tableGoodsOptions.forEach((item) => {
        var options = [];
        item.values.forEach((v) => {
          options.push({
            id: item.id,
            name: item.name,
            value: v,
          });
        });
        allOption.push(options);
      });

      var skuOptions = Array.prototype.reduce.call(
        allOption,
        (a, b) => {
          var ret = [];
          a.forEach((a) => {
            b.forEach((b) => {
              ret.push(a.concat([b]));
            });
          });
          return ret;
        },
        [[]]
      );

      var infos = {};
      this.goods.variations.forEach((v) => {
        var normalizedName = "";
        v.optionCombinations.forEach((o) => {
          normalizedName += o.value + " ";
        });
        normalizedName = normalizedName.substr(0, normalizedName.length - 1);
        infos[normalizedName] = v;
      });

      skuOptions.forEach((item) => {
        var normalizedName = "";
        var optionCombinations = [];
        item.forEach((o, index) => {
          normalizedName += o.value + " ";
          optionCombinations.push({
            optionId: o.id,
            value: o.value,
            displayOrder: index,
          });
        });
        normalizedName = normalizedName.substr(0, normalizedName.length - 1);
        if (!infos[normalizedName]) {
          var newGoods = {
            id: 0,
            normalizedName: normalizedName,
            price: 0,
            stockQuantity: 0,
            optionCombinations: optionCombinations,
          };
          this.goods.variations.push(newGoods);
        }
      });
    },
    generateOptions() {
      this.goods.options = [];
      this.tableGoodsOptions.forEach((item) => {
        var values = [];
        item.values.forEach((v, i) => {
          var params = {
            value: v,
            displayOrder: i,
          };
          values.push(params);
        });

        this.goods.options.push({
          id: item.id,
          name: item.name,
          values: values,
        });
      });
    },
    saveGoodsHandler() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          this.disabled = true;

          this.generateOptions();
          let maxPrice = 0;
          this.goods.variations.forEach((item) => {
            item.price = item.price * 100;
            if (item.price > maxPrice) {
              maxPrice = item.price;
            }
          });
          this.goods.price = parseInt(maxPrice);

          if (this.goodsId === 0) {
            goodsAdd(this.goods)
              .then((res) => {
                this.disabled = false;
                if (res.code === 0) {
                  this.$router.push({ name: "Goods" });
                } else {
                  this.precisionPrice();
                }
              })
              .catch(() => {
                this.disabled = false;
              });
          } else {
            var params = {
              id: this.goodsId,
              data: this.goods,
            };
            goodsEdit(params)
              .then((res) => {
                this.disabled = false;
                if (res.code === 0) {
                  this.$router.push({ name: "Goods" });
                } else {
                  this.precisionPrice();
                }
              })
              .catch(() => {
                this.disabled = false;
              });
          }
        }
      });
    },
    precisionPrice() {
      this.goods.variations.forEach((item) => {
        item.price = item.price / 100;
      });
    },
    returnGoodsList() {
      this.$router.push({ name: "Goods" });
    },
  },
  mounted() {
    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imageHandler);

    var allRequests = [goodsOptionAll(), goodsOptionDataAll()];
    if (this.goodsId > 0) {
      allRequests = [
        goodsOptionAll(),
        goodsOptionDataAll(),
        goodsGet(this.goodsId),
      ];
    }
    this.loading = true;
    http.all(allRequests).then(
      http.spread((option, optionData, goods) => {
        if (option.code === 0) {
          this.goodsOptions = option.data;
        }
        if (optionData.code === 0) {
          this.goodsOptionData = optionData.data;
        }
        if (goods) {
          if (goods.code === 0) {
            this.goods = goods.data;
            var goodsMediaIds = [];
            this.goods.goodsMedias.forEach((item) => {
              goodsMediaIds.push(item.id);
            });
            this.$set(this.goods, "goodsMediaIds", goodsMediaIds);

            // 修改价格
            this.precisionPrice();

            // {
            //   id: 0,
            //   name: "",
            //   values: [],
            // },
            this.goods.options.forEach((o) => {
              var values = [];
              o.values.forEach((v) => {
                values.push(v.value);
              });
              var option = {
                id: o.id,
                name: o.name,
                values: values,
              };
              this.tableGoodsOptions.push(option);
            });
          }
        }
        this.loading = false;
      })
    );
  },
  created() {
    if (this.$route.query.id) {
      this.goodsId = this.$route.query.id;
    }
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader-icon {
  background-color: #fbfdff;
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
}
</style>
