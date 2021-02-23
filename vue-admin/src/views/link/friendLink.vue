<template>
  <div class="friendLink">
    <!--序号,博客名,博客作者,博客logo,博客地址,博客简介-->
    <div class="conditions">
      <div>
        <el-input
          v-model="blog_name"
          placeholder="请输入博客名称查询"
          clearable
        ></el-input>
        <el-input
          v-model="author"
          placeholder="请输入博客作者查询"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="_search"
          >查询</el-button
        >
      </div>
      <el-button
        type="warning"
        icon="el-icon-circle-plus-outline"
        @click="_addShow"
        style="margin-top:8px"
        >新增友链</el-button
      >
    </div>

    <el-table :data="List" border style="width: 100%" fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="blog_name" label="博客名称" width="180">
      </el-table-column>
      <el-table-column prop="author" label="博客作者" width="160">
      </el-table-column>
      <el-table-column prop="logo" label="博客logo" width="110">
      </el-table-column>
      <el-table-column prop="link" label="博客地址" width="350">
      </el-table-column>
      <el-table-column prop="content" label="博客简介" width="800">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="_editShow(scope.$index, scope.row)"
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
    <el-dialog
      disabled
      class="prop"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <h2 v-show="isCreate">新建友链</h2>
      <h2 v-show="isEdit">编辑友链</h2>
      <link-view :form="form" />

      <span slot="footer">
        <el-button type="primary" v-show="isCreate" @click="_create"
          >新 建</el-button
        >
        <el-button type="primary" v-show="isEdit" @click="_edit"
          >修 改</el-button
        >
        <el-button @click="_cancel">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLinkList, deleteLink, createLink, editLink } from "@/api/api";
import LinkView from "@/components/private/linkView";
export default {
  data() {
    return {
      author: "",
      blog_name: "",
      List: null,
      pageSize: 10,
      currentPage: 1,
      pageCount: 6,
      total: 20,
      listLoading: true,
      form: null,
      centerDialogVisible: false,
      isCreate: false,
      isEdit: false,
    };
  },
  components: {
    "link-view": LinkView,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listLoading = true;
      getLinkList({
        author: this.author,
        blog_name: this.blog_name,
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
    // 点击删除按钮
    remove(row) {
      this.$confirm(`确定要永久删除名称为 ${row.blog_name} 的博客吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteLink({
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.init();
    },
    //点击编辑 显示dialog
    _editShow(index, row) {
      this.form = row;
      this.isEdit = true;
      this.isCreate = false;
      this.centerDialogVisible = true;
    },
    //点击编辑 显示dialog
    _addShow() {
      this.form = {};
      this.isCreate = true;
      this.isEdit = false;
      this.centerDialogVisible = true;
    },
    // 点击取消 隐藏dialog
    _cancel() {
      this.centerDialogVisible = false;
    },
    _create() {
      createLink(this.form).then((res) => {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.centerDialogVisible = false;
        this.init();
      });
    },
    _edit() {
      editLink(this.form).then((res) => {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.centerDialogVisible = false;
        this.init();
      });
    },
  },
};
</script>
<style lang="scss">
.friendLink {
  .conditions {
    width: 98%;
    display: flex;
    justify-content: space-between;
    .el-input {
      width: 250px;
      margin-left: 2px;
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
  .prop {
    h2 {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
