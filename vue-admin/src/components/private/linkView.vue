<template>
  <div class="link-view">
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="博客名称" required>
        <el-input
          clearable
          v-model="form.blog_name"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="博客作者" required>
        <el-input
          clearable
          v-model="form.author"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <!-- 项目logo -->
      <el-form-item label="项目logo">
          <el-upload
            class="avatar-uploader"
            :action="$service.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
         
            <img v-if="form.image" :src="form.image" class="image" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>



      <el-form-item label="博客地址" required>
        <el-input clearable v-model="form.link" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="内容简介" class="content" required>
        <el-input
          type="textarea"
          v-model="form.content"
          style="width: 300px"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["form"],
  data() {
    return {
      imgUrl:'',
      domain:'http://cdn.codeting.top/',
    };
  },
  methods: {
     handleSuccess(res){
       this.imgUrl = res.imgUrl
       let image= this.domain + res.imgUrl
       this.$set(this.form,'image',image)
       
    }
  },
};
</script>
<style lang="scss">
.link-view {
  margin-top: 40px;
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px solid rgb(228, 220, 220);
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .image {
    width: 80px;
    height: 80px;
    display: block;
  }
 .el-textarea__inner {
        width: 540px;
        height: 200px;
      }
}
</style>
