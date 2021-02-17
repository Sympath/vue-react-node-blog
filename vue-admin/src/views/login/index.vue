<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRule"
      auto-complete="on"
      label-position="left"
    >
      <div class="login-title">
        <h2 class="title">JS blog 后 台 管 理 系 统</h2>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont">&#xe611;</i>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          placeholder="管理员账户"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont">&#xe60e;</i>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          tabindex="2"
          show-password
          placeholder="管理员密码"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="login-btn"
        @click="_Login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { adminLogin } from "@/api/api";
import { setLocalStorage } from "@/utils/local-storage";

export default {
  data() {
    const verifyPassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error("密码长度应大于8位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRule: {
        username: [
          {
            required: true,
            message: "账号不允许为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不允许为空",
            trigger: "blur",
          },
          { validator: verifyPassword, trigger: "blur" },
        ],
      },
      passwordType: "password",
      loading: false,
    };
  },
  methods: {
    _Login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.loading) {
          adminLogin(this.loginForm)
            .then((res) => {
              console.log(res)
              if (res.data.status == "200") {
                this.loading = true;
                setLocalStorage({
                  Authorization: res.data.token,
                });
                this.$router.push({ path: "/" });
              }
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #2c3a4b;
$light_gray: #eee;
$cursor: #fff;

.login {
  .el-input {
    height: 46px;
    width: 85%;
    display: inline-block;
    font-size: 15px;
    input {
      height: 48px;
      background: transparent;
      border: none;
      padding: 12px 5px 12px 5px;
      color: $light_gray;

      // 改变历史密码选中的样式
      &:-webkit-autofill {
        -webkit-text-fill-color: $light_gray !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scope>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 120px 30px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .login-btn {
    margin-top: 20px;
    width: 100%;
  }
  .svg-container {
    padding: 5px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .login-title {
    position: relative;

    .title {
      font-size: 35px;
      color: $light_gray;
      margin: 0px auto 60px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
