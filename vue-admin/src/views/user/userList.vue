<template>
  <div class="user-list">
    <!-- 序号,用户_id,用户账号(account),昵称(nickname),性别,头像,注册时间,token,点赞,评论 -->

    <div class="conditions">
        <el-input
          v-model="account"
          placeholder="请输入用户账号查询"
          clearable
        ></el-input>
        <el-input
          v-model="nackname"
          placeholder="请输入用户昵称查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="_id" label="用户ID" width="240">
      </el-table-column>
      <el-table-column prop="account" label="用户账号" width="200">
      </el-table-column>
      <el-table-column prop="nackname" label="用户昵称" width="260">
      </el-table-column>
      <el-table-column prop="register_time" width="200" label="注册时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
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
import { getUserList, deleteUser } from "@/api/api";
export default {
  data() {
    return {
      article_types: null,
      account: "",
      List: null,
      nackname: "",
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
      getUserList({
        account: this.account,
        nackname: this.nackname,
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
    _search() {
      this.currentPage = 1;
      this.init();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.init();
    },
    // 点击注销按钮
    remove(row) {
      this.$confirm(`确定要永久注销昵称为 ${row.nackname} 的用户吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({
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
            message: "已取消注销",
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

