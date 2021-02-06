<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-loading="editorLoading"
      v-model="content"
      :options="quillEditorOption"
      @change="onEditorChange($event)"
    />
    <el-upload
      action="#"
      :before-upload="beforetImageUpload"
      :http-request="uploadEditorImage"
      style="display: none"
    >
      <button ref="uploadBtn"></button>
    </el-upload>
    <el-progress
      v-if="editorLoading"
      :percentage="editorUploadImgPercentage"
    ></el-progress>
  </div>
</template>

<script>
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
import { quillEditor } from "vue-quill-editor";
import { uploadImg } from "@/api/media";

export default {
  components: {
    quillEditor,
  },
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  watch: {
    value(val) {
      this.content = val;
    },
    content(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      content: this.value,
      editorLoading: false,
      editorUploadImgPercentage: 0,
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
    };
  },
  methods: {
    onEditorChange({ html }) {
      this.content = html;
    },
    imageHandler(state) {
      if (state) {
        let btn = this.$refs.uploadBtn;
        btn.click();
      }
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
    uploadEditorImage(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      this.editorLoading = true;
      this.editorUploadImgPercentage = 0;
      uploadImg(formData, (progressEvent) => {
        let num = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        this.editorUploadImgPercentage = num;
      })
        .then((res) => {
          this.editorLoading = false;
          if (res.code === 0) {
            var addRanage = this.$refs["myQuillEditor"].quill.getSelection();
            this.$refs["myQuillEditor"].quill.insertEmbed(
              addRanage !== null ? addRanage.index : 0,
              "image",
              res.data.url
            ); // 调用编辑器的 insertEmbed 方法，插入URL
          }
        })
        .catch(() => {
          this.editorLoading = false;
          this.$message.error("请求失败");
        });
    },
  },
  mounted() {
    this.$refs["myQuillEditor"].quill
      .getModule("toolbar")
      .addHandler("image", this.imageHandler);
  },
};
</script>