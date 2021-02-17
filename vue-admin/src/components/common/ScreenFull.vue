<template>
  <el-tooltip content="全屏" effect="dark">
    <i class="el-icon-full-screen" @click="_screenfull" />
  </el-tooltip>
</template>

<script>
import screenfull from "screenfull";
export default {
  methods: {
    _screenfull() {
      if (screenfull.enabled) {
        this.$message({
          message: "浏览器不支持全屏",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
  },
};
</script>
<style lang="scss">
.el-icon-full-screen {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin-top: 3px;
}
</style>
