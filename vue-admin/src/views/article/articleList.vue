<template>
  <div class="article-list">
    <div class="conditions">
      <el-select @change="_change" v-model="category" placeholder="请选择文章分类">
        <el-option
          v-for="item in article_types"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <!-- 时间查询暂时去掉，查询难度大 -->
      <!-- <div class="block">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div> -->
      <div class="title-search">
        <el-input
          v-model="title"
          placeholder="请输入标题查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
      </div>
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="160">
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="260"> </el-table-column>
      <el-table-column prop="author" label="作者" width="110">
      </el-table-column>
      <el-table-column prop="category" label="所属分类" width="160">
      </el-table-column>
      <el-table-column prop="isPublic" width="78" label="是否公开">
      </el-table-column>
      <el-table-column width="100" label="文章封面">
        <template slot-scope="scope">
          <img :src="scope.row.head_pic" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="read" width="80" label="阅读量"> </el-table-column>
      <el-table-column prop="like" width="70" label="点赞量"> </el-table-column>
      <el-table-column prop="name" width="70" label="评论量"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="success" size="small"
            >查看</el-button
          >
          <el-button type="primary" size="small" @click="handleClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-count="pageCount"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getArticleList, getArticleType, deleteArticle } from "@/api/api";
export default {
  data() {
    return {
      article_types: null,
      category: "",
      List: null,
      title: "",
      // date:"",
      pageSize: 10,
      currentPage: 1,
      pageCount: 6,
      total: 20,
      listLoading: true,
    };
  },
  created() {
    this.getType();
    this.init();
  },
  methods: {
    getType() {
      getArticleType().then((res) => {
        this.article_types = res.data;
      });
    },
    init() {
      this.listLoading = true;
      getArticleList({
        category: this.category,
        title: this.title,
        // date:this.date,
        current: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.listLoading = false;
        this.List = res.data.list;
        this.total = res.data.total;
      });
    },
    // 改变分类触发的事件
    _change() {
      this.currentPage = 1;
      this.init();
    },
    _search() {
      this.currentPage = 1;
      this.init();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.init();
    },
    // 点击查看/编辑按钮
    handleClick(row) {
      this.$router.push({ name: "ArticleEdit", params: { id: row._id } });
    },
    // 点击删除按钮
    remove(row) {
      this.$confirm(`确定要永久删除标题为 ${row.title} 的文章吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle({
            id: row._id,
          }).then((res) => {
            this.$message({
              message: res.data.message,
              type: "success",
            });
          });
          this.init()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss">
.article-list {
  .conditions {
    display: flex;
    justify-content: space-between;
    width: 42%;
    .title-search {
      display: flex;
      .el-input {
        width: 250px;
      }
      .el-button {
        margin-left: 2px;
      }
    }
  }
  .el-table {
    margin-top: 20px;
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
