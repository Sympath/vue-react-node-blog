<template>
  <div class="project-create">
    <el-form ref="form" :model="form" label-position="top">
      <div class="t-a">
        <el-form-item class="title" label="项目名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="项目作者" class="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
      </div>

      <div class="u-s">
        <el-form-item label="项目地址" class="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="项目状态" class="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="开发中" value="开发中"> </el-option>
            <el-option label="维护中" value="维护中"> </el-option>
            <el-option label="已完成" value="已完成"> </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="c-i">
        <el-form-item label="项目封面">
          <el-upload
            class="avatar-uploader"
            :action="$service.defaults.baseURL + '/admin/upload'"
            :show-file-list="false"
            :on-success="(res) => $set(form, 'image', res.url)"
          >
            <img v-if="form.image" :src="form.image" class="image" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="是否公开"
          style="margin-left:298px"
          class="is-public"
        >
          <el-switch
            active-text="是"
            inactive-text="否"
            v-model="form.isPublic"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :width="50"
          >
          </el-switch>
        </el-form-item>
      </div>

      <el-form-item label="项目简介">
        <el-input type="textarea" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="_create">新建项目</el-button>
        <el-button type="danger" @click="_clear">清空简介</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { createProject } from "@/api/api";
export default {
  data() {
    return {
      form: {
        title: "",
        cover: "",
        url: "",
        status: "维护中",
        introduce: "",
        author: "付金廷",
        isPublic: true,
        create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
    };
  },
  methods: {
    _clear() {
      this.$confirm("确定要清空该项目的简介吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.introduce = "";
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
    _create() {
      createProject(this.form).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
      });
    },
  },
};
</script>
<style lang="scss">
// 样式
.project-create {
  width: 100%;
  display: flex;
  justify-content: center;
  .el-form {
    width: 49%;

    .t-a {
      display: flex;
      .author {
        margin-left: 20px;
        .el-input {
          width: 215px;
        }
      }
      .title {
        .el-input {
          width: 430px;
        }
      }
    }
    .u-s {
      display: flex;
      .url {
        .el-input {
          width: 430px;
        }
      }
      .status {
        margin-left: 20px;
      }
    }
    .c-i {
      display: flex;
    }

    // 修改文本域宽度,高度
    .el-textarea__inner {
      width: 670px;
      height: 160px;
    }
    .btn {
      text-align: center;
      width: 100%;
    }
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .image {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
