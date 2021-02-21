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
      <el-form-item label="文章封面" class="cover">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
        >
          <el-button size="small" type="primary">点击上传(不必须)</el-button>
        </el-upload>
      </el-form-item>
    </div>

    <el-form-item label="文章内容">
      <mavon-editor
        class="editor"
        ref="editor"
        v-model="form.article"
        placeholder="写一篇文章吧...."
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
        author: "付金廷",
        category: "",
        create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
      article_types: null,
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    save() {
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
    getArticleCate() {
      getArticleType().then((res) => {
        this.article_types = res.data;
      });
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
    min-height: 515px;
  }
  .btn {
    text-align: center;
  }
}
</style>
