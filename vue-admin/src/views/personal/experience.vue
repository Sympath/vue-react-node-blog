<template>
  <div>
    <el-form @submit.native.prevent="save">
      <el-form-item>
        <!-- 个人经历暂用 富文本编辑器 -->
        <vue-editor
          v-model="expre"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postBloggerExperience, getBloggerExperience } from "@/api/api";
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      expre: "",
    };
  },
  components: {
    VueEditor,
    
  },
  methods: {
    clear() {
      this.expre = "";
    },
    save() {
      postBloggerExperience({ experience: this.expre }).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.init();
      });
    },
    init() {
      getBloggerExperience().then((res) => {
        this.expre = res.data;
      });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss">
.ql-editor {
  min-height: 480px !important;
}

.btn {
  text-align: center;
}
</style>
