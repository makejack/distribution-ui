<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
html,
body,
#app,
.el-menu {
  height: 100%;
}

.layout-container {
  height: 100%;
}

.w-100 {
  width: 100%;
}

.text-secondary {
  color: #909399;
}
.text-danger {
  color: #f5222d;
}
.text-center {
  text-align: center;
}
.card {
  margin-bottom: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-form-item__content {
  .quill-editor {
    line-height: 24px;
    .ql-toolbar {
      border: 1px solid #dcdfe6;
    }
    .ql-container {
      border: 1px solid #dcdfe6;
      height: 300px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.toolbar {
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
}
.toolbar-btn {
  justify-self: right;
}

.pagination {
  margin: 20px 0;
}
</style>
