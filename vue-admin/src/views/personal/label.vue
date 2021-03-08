<template>
  <div class="personal-label">
    <el-tag
      type="success"
      style="margin-top:20px"
      :key="tag"
      v-for="tag in bloggerLabels"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm1"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ 新建标签</el-button
    >
  </div>
</template>
<script>
import { postBloggerLabel, getBloggerLabel } from "@/api/api";
export default {
  data() {
    return {
      bloggerLabels: null,
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleClose(tag) {
      this.$confirm("确定删除该标签吗? 该操作不可逆!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.bloggerLabels.splice(this.bloggerLabels.indexOf(tag), 1);
          postBloggerLabel(this.bloggerLabels).then((res) => {
            this.$message({
              message: res.data.message,
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.bloggerLabels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      postBloggerLabel(this.bloggerLabels).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
      });
    },
    handleInputConfirm1() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.bloggerLabels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      postBloggerLabel(this.bloggerLabels).then(() => {
        // this.$message({
        //   message: res.data.message,
        //   type: "success",
        // });
      });
    },
    init() {
      getBloggerLabel().then((res) => {
        console.log(res.data);
        this.bloggerLabels = res.data;
      });
    },
  },
};
</script>
<style lang="scss">
.personal-label {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 900px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag {
    height: 35px;
    font-size: 20px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 20px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    margin-top: 20px;
  }
}
</style>
