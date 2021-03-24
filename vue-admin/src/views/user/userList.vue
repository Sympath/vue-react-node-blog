<template>
  <div class="user-list">
    <!-- 序号,用户_id,用户账号(account),昵称(nickname),性别,头像,注册时间,token,点赞,评论 -->

    <div class="conditions">
        <el-input
          v-model="url"
          placeholder="请输入用户账号查询"
          clearable
        ></el-input>
        <el-input
          v-model="title"
          placeholder="请输入用户名查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="author" label="用户ID" width="160">
      </el-table-column>
      <el-table-column prop="create_time" label="用户账号" width="160">
      </el-table-column>
      <el-table-column prop="title" label="用户昵称" width="260">
      </el-table-column>
      <el-table-column prop="category" label="头像" width="120">
      </el-table-column>
      <el-table-column prop="isPublic" width="150" label="注册时间">
      </el-table-column>
      <el-table-column prop="read" width="80" label="留言量"> </el-table-column>
      <el-table-column prop="name" width="70" label="评论量"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="success" size="small"
            >查看信息</el-button
          >
          <el-button type="danger" size="small" @click="remove(scope.row)"
            >注销账号</el-button
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
          this.init();
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
.user-list {
  
    .conditions {
      width: 44%;
      display: flex;
      justify-content: space-between;
      .el-input {
        width: 250px;
      }
      .el-button {
        margin-left: 2px;
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

