<template>
  <div class="reset">
    <el-form ref="form" :model="form" label-width="70px" label-position="right">
      <el-form-item class="input" label="账 号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item class="input" label="原密码">
        <el-input
          v-model="form.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="input" label="新密码">
        <el-input
          v-model="form.new_password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="input" label="确认密码">
        <el-input
          v-model="form.require_password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="_reset">修改密码</el-button>
        <el-button type="danger" @click="_clear">清空内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { adminReset } from "@/api/api";
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
        new_password: "",
        require_password: "",
      },
    };
  },
  methods: {
    _clear() {
      this.form.account = "";
      this.form.password = "";
      this.form.new_password = "";
      this.form.require_password = "";
    },
    _reset() {
      if (this.form.new_password != this.form.require_password) {
        this.$message({
          message: "请保证 确认密码与新密码 一致",
          type: "warning",
        });
      } else {
        adminReset(this.form).then((res) => {
          this.$message({
            message: res.data.message,
            type: "success",
          });
        });
      }
    },
  },
};
</script>
<style lang="scss">
.reset {
  display: flex;
  width: 100%;
  justify-content: center;

  .el-form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .el-form-item {
      margin-top: 25px;
    }
    .input {
      width: 450px;
    }
    .btn {
      width: 95%;
      text-align: center;
    }
  }
}
</style>
