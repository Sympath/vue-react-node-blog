<template>
  <el-form ref="form" :model="form" label-position="top" class="edit-article">
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
        ref="editor"
        v-model="form.article"
        placeholder="写一篇文章吧...."
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
      >
      </mavon-editor>
    </el-form-item>

    <el-form-item class="btn">
      <el-button type="primary" @click="_edit">修改文章</el-button>
      <el-button type="danger" @click="_clear">清空内容</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  getArticleType,
  getArticle,
  getRecentArticle,
  editArticle,
  uploadImage,
} from "@/api/api";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
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
      },
      article_types: null,
      imgUrl: "",
      domain: "http://cdn.codeting.top/",
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    getArticleCate() {
      getArticleType().then((res) => {
        this.article_types = res.data;
      });
    },
    init() {
      if (this.$route.params.id) {
        getArticle({ id: this.$route.params.id }).then((res) => {
          this.form = res.data.article;
        });
      } else {
        getRecentArticle().then((res) => {
          this.form = res.data.article[0];
          // 消息提示
          this.$notify.info({
            title: "提醒",
            message:
              "默认修改最近一篇文章,您可以通过点击(文章列表),点击(查看or编辑) 修改更多的文章哦!",
            duration: 4500,
          });
        });
      }
    },
    _edit() {
      editArticle(this.form).then((res) => {
        this.$message({
          type: "success",
          message: res.data.message,
        });
      });
    },
    _clear() {
      this.form.article = "";
    },
    handleSuccess(res) {
      this.imgUrl = res.imgUrl;
      this.form.image = this.domain + res.imgUrl;
      console.log(this.form.image);
    },
    handleEditorImgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("file", $file);
      uploadImage(formData).then((res) => {
        console.log(res.data.imgUrl);
        this.$refs.editor.$img2Url(pos, this.domain + res.data.imgUrl);
      });
    },
    handleEditorImgDel(pos, $file) {
      console.log(pos, $file);
    },
  },
  created() {
    this.getArticleCate();
    this.init();
  },
};
</script>
<style lang="scss" scope>
.edit-article {
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
