<template>
  <div class="ele-container">
    <div>
      <h1 class="ele-space-t-b">404</h1>
      <p class="ele-space-t-b">没有找到你想要网页</p>
      <el-button @click="returnHandle">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    returnHandle() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.ele-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ele-space-t-b {
  margin: 20px 0px;
}
</style>