<template>
  <div>
    <el-form @submit.native.prevent="save">
      <el-form-item>
        <!-- 个人经历暂用 富文本编辑器 -->
        <vue-editor
          class="vue-editor"
          v-model="expre"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" native-type="submit">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postBloggerExperience, getBloggerExperience ,uploadImage} from "@/api/api";
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      expre: "",
      domain:'http://cdn.codeting.top/'
    };
  },
  components: {
    VueEditor,
    
  },
  methods: {
    
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
    handleImageAdded(file, Editor, cursorLocation, resetUploader){
       const formData = new FormData();
       formData.append("file", file);
       uploadImage(formData).then(res=>{
          console.log(res);
          Editor.insertEmbed(cursorLocation, "image", this.domain+res.data.imgUrl);
          resetUploader();
       })
    }
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scope>

.vue-editor {
  height: 605px;
}

.btn {
  margin-top: 80px;
  text-align: center;
}
</style>
