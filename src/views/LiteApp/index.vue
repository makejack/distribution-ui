<template>
  <div>
    <div class="toolbar">
      <h2>小程序设置</h2>
      <div class="toolbar-btn">
        <el-button type="primary" :loading="loading" @click="saveHandle"
          >保存</el-button
        >
      </div>
    </div>

    <el-form
      v-loading="loading"
      :model="form"
      ref="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="城市合伙人权益" prop="cityMembershipRights">
        <quill-editor v-model="form.cityMembershipRights" />
      </el-form-item>
      <el-form-item label="网点合伙人权益" prop="branchMembershipRights">
        <quill-editor v-model="form.branchMembershipRights" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import QuillEditor from "../../components/QuillEditor";
import { liteappGet, liteappSave } from "../../api/liteapp";

export default {
  name: "LiteApp",
  components: {
    QuillEditor,
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      form: {
        id: 0,
        cityMembershipRights: "",
        branchMembershipRights: "",
      },
      rules: {
        cityMembershipRights: [
          { required: true, message: "请设置小程序权益内容", trigger: "blur" },
        ],
        branchMembershipRights: [
          { required: true, message: "请设置小程序权益内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    saveHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          liteappSave(this.form)
            .then((res) => {
              this.loading = false;
              if (res.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    loadLiteAppSetting() {
      this.loading = true;
      liteappGet()
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
    this.loadLiteAppSetting();
  },
};
</script>
