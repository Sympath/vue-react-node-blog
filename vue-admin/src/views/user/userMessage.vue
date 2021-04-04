<template>
  <div class="user-message">
    <div class="conditions">
        <el-input
          v-model="nackname"
          placeholder="请输入用户昵称查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row  row-key="user_id"
    :tree-props="{children: 'second_message', hasChildren: 'hasChildren'}">
      <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
      <el-table-column prop="user_id" label="留言用户ID" sortable width="260" align="center">
      </el-table-column>
      <el-table-column prop="nackname" label="留言用户昵称" width="180" align="center">
         
      </el-table-column>
      <el-table-column  label="一级留言内容" width="200" align="center">
           <template slot-scope="scope">
              {{scope.row.message_txt?scope.row.message_txt:'【暂無】'}}
          </template>
      </el-table-column>
      <el-table-column  width="180" label="留言时间" align="center" >
          <template slot-scope="scope">
              {{scope.row.message_time?scope.row.message_time:'【暂無】'}}
          </template>
      </el-table-column>
      <el-table-column label="二级回复内容" width="200" align="center">
          <template slot-scope="scope">
              {{scope.row.secend_message_txt?scope.row.secend_message_txt:'【暂無】'}}
          </template>
      </el-table-column>
      
       <el-table-column  width="200" label="留言回复时间" align="center">
            <template slot-scope="scope">
              {{scope.row.secend_create_time?scope.row.secend_create_time:'【暂無】'}}
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center" >
        <template slot-scope="scope" v-if="scope.row.message_time">
          <el-button type="danger" size="small" @click="remove(scope.row)" 
            >删除留言</el-button
            
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
import { getMessageList, deleteMessage } from "@/api/api";
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
      getMessageList({
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
    // 点击删除按钮
    remove(row) {
      this.$confirm(`确定要永久删除此条留言吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMessage({
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

