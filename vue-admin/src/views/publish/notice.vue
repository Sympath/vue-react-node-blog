<template>
  <div class="notice">
    <div class="notice-table">
      <h2>历史公告</h2>
      <el-table
        border
        :data="
          notices.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="notice" label="内容"> </el-table-column>
      </el-table>
      <!-- 前端分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="prev, pager, next"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>

    <el-form>
      <h2>新建公告</h2>

      <el-form-item>
        <el-input
          class="notice-textarea"
          type="textarea"
          v-model="notice"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="save" @click="save" type="primary">发布</el-button>
        <el-button class="cancel" @click="clear" type="danger">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postPublishNotice, getPublishNotice } from "@/api/api";
// 格式化时间
import dayjs from "dayjs";

export default {
  data() {
    return {
      notice: "",
      create_time: dayjs(new Date()).format("YYYY-MM-DD"),
      notices: null,
      currentPage: 1,
      pagesize: 5,
      total:0
    };
  },
  created() {
    this.init();
  },
  methods: {
    save() {
      postPublishNotice({
        notice: this.notice,
        create_time: this.create_time,
      }).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.notice = "";
        this.init();
      });
    },
    clear() {
      this.notice = "";
    },
    init() {
      getPublishNotice().then((res) => {
        console.log(res.data);
        this.notices = res.data.reverse();
        this.total=res.data.length
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style lang="scss">
.notice {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .notice-table {
    width: 45%;
    .el-table {
      width: 100%;
    }
    .el-pagination {
      margin-top: 20px;
      float: right;
    }
  }

  .el-form {
    width: 45%;
    .notice-textarea {
      .el-textarea__inner {
        width: 540px;
        height: 290px;
      }
    }
  }
}
h2 {
  width: 200px;
}
</style>
