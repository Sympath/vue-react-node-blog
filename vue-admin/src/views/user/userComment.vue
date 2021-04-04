<template>
  <div class="user-message">
    <div class="conditions">
        <el-input
          v-model="title"
          placeholder="请输入文章标题查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
    </div>
    <!--  前端分页  -->
    <el-table :data="List.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" fit highlight-current-row >
      <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
      
      <el-table-column prop="userId" label="评论用户ID" sortable width="260" align="center">
      </el-table-column>
      <el-table-column prop="nackname" label="评论用户昵称" width="180" align="center">
         
      </el-table-column>
       <el-table-column prop="title" label="文章标题" sortable width="260" align="center">
      </el-table-column>
      <el-table-column  label="评论内容" width="400" align="center" prop="comment_txt">
         
      </el-table-column>
      <el-table-column  width="180" label="评论时间" align="center" prop="comment_time">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center" >
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="remove(scope.row)" 
            >删除评论</el-button
            
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
import { getCommentList, deleteComment } from "@/api/api";
export default {
  data() {
    return {
      article_types: null,
      title: "",
      List: null,
      // date:"",
      pageSize: 10,
      currentPage: 1,
      pageCount: 6,
      total: 20,
      listLoading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listLoading = true;
      // 获取用户列表
      getCommentList({
        title: this.title,
        current: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.listLoading = false;
        this.List = res.data.comments.reverse();
        this.total = res.data.total;
      });
    },
    // 改变分类触发的事件
    _search() {
      this.currentPage = 1;
      this.init();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.init();
    },
    // 点击删除按钮
    remove(row) {
      this.$confirm(`确定要永久删除此条评论吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment({
            id: row.id,
            articleId: row.articleId,
          }).then((res) => {
            this.$message({
              message: res.data.message,
              type: "success",
            });
             this.init();
          });
         
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
.user-message {
  
    .conditions {
      width: 25%;
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

