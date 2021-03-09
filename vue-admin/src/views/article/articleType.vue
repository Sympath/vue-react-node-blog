<template>
  <div class="article-type">
    <el-tag
      effect="dark"
      style="margin-top:20px"
      :key="tag"
      v-for="tag in articleTypes"
      closable
      :disable-transitions="true"
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
      >+ 新建文章分类</el-button
    >
  </div>
</template>
<script>
import { postArticleType, getArticleType } from "@/api/api";
export default {
  data() {
    return {
      articleTypes: null,
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleClose(tag) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.articleTypes.splice(this.articleTypes.indexOf(tag), 1);
          postArticleType(this.articleTypes).then((res) => {
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
        this.articleTypes.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      postArticleType(this.articleTypes).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
      });
    },
    handleInputConfirm1() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.articleTypes.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      postArticleType(this.articleTypes).then(() => {});
    },
    init() {
      getArticleType().then((res) => {
        this.articleTypes = res.data;
      });
    },
  },
};
</script>
<style lang="scss">
.article-type {
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
