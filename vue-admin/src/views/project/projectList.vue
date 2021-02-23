<template>
  <div class="project-list">
    <div class="conditions">
        <el-input
          v-model="url"
          placeholder="请输入(项目源码)地址查询"
          clearable
          style="width:450px"
        ></el-input>
        <el-input
          v-model="title"
          placeholder="请输入项目名称查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
     
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="160">
      </el-table-column>
      <el-table-column prop="title" label="项目名称" width="260"> </el-table-column>
      <el-table-column prop="author" label="开发者" width="110">
      </el-table-column>
      <el-table-column prop="url" label="项目(源码)地址" width="470">
      </el-table-column>
      <el-table-column prop="status" label="开发状态" width="80">
      </el-table-column>
      <el-table-column prop="isPublic" width="78" label="是否公开">
      </el-table-column>
      <el-table-column width="100" label="项目封面">
        <template slot-scope="scope">
          <img :src="scope.row.head_pic" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="read" width="70" label="浏览量"> </el-table-column>
      <el-table-column prop="like" width="70" label="点赞量"> </el-table-column>
      <el-table-column prop="name" width="70" label="评论量"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
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
import { getProjectList, deleteProject } from "@/api/api";
export default {
  data() {
    return {
      List: null,
      url:"",
      title:"",
      pageSize: 10,
      currentPage: 1,
      pageCount: 6,
      total: 20,
      listLoading: true
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listLoading = true;
      getProjectList({
        url: this.url,
        title: this.title,
        current: this.currentPage,
        limit: this.pageSize,
      }).then((res) => {
        this.listLoading = false;
        this.List = res.data.list;
        this.total = res.data.total;
      });
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
      this.$router.push({ name: "ProjectEdit", params: { id: row._id } });
    },
    // 点击删除按钮
    remove(row) {
      this.$confirm(`确定要永久删除名称为 ${row.title} 的项目吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject({
            id: row._id,
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
.project-list {
 
    .conditions {
      width: 59%;
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
