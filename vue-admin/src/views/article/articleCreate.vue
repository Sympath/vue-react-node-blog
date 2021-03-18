<template>
  <el-form ref="form" :model="form" label-position="top" class="create-article">
    <div class="article-t-a">
      <el-form-item label="所属分类">
        <el-select v-model="form.category" placeholder="请选择分类">
          <el-option
            v-for="item in article_types"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题" class="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章作者" class="author">
        <el-input v-model="form.author" placeholder="请输入作者姓名"></el-input>
      </el-form-item>
      <el-form-item label="是否公开" class="is-public">
        <el-switch
          active-text="是"
          inactive-text="否"
          v-model="form.isPublic"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :width="45"
        >
        </el-switch>
      </el-form-item>
     
        <el-form-item label="文章封面(不必须)">
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
     
    </div>

    <el-form-item label="文章内容">
      <mavon-editor
        class="editor"
        ref="md"
        v-model="form.article"
        placeholder="写一篇文章吧...."
        @change="_change"
      >
      </mavon-editor>
    </el-form-item>

    <el-form-item class="btn">
      <el-button type="primary" @click="save">新建文章</el-button>
      <el-button type="danger" @click="clear">清空内容</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getArticleType, createArticle } from "@/api/api";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import dayjs from "dayjs";
export default {
  data() {
    return {
      form: {
        article: "",
        isPublic: true,
        title: "",
        image: "",
        author: "付金廷",
        category: "",
        create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      html:'',
      article_types: null,
      imgUrl:'',
      domain:'http://cdn.codeting.top/'
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    save() {
      this.$set(this.form,'html',this.html)
      createArticle(this.form).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
      });
    },
    clear() {
      this.$confirm("确定要清空该文章的内容吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.article = "";
          this.$message({
            type: "success",
            message: "清空成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    _change(r,v){
        this.html =  v
    },
    getArticleCate() {
      getArticleType().then((res) => {
        this.article_types = res.data;
      });
    },
    handleSuccess(res){
      
       this.imgUrl = res.imgUrl
       this.form.image= this.domain + res.imgUrl
    
    },
    
  },
  created() {
    this.getArticleCate();
  },
};
</script>
<style lang="scss">



.create-article {
  .article-t-a {
    display: flex;
    justify-content: space-between;
    width: 99%;
    .author {
      width: 200px;
    }
    .title {
      width: 450px;
    }
    .is-public {
      width: 100px;
    }
  }
  .editor {
    min-height: 510px;
  }
  .btn {
    text-align: center;
  }

  // 上传头像标准化
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 35px;
  display: block;
}
.image {
  width: 100px;
  height: 35px;
  display: block;
}
}
</style>
