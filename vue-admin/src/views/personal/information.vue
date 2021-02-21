<template>
  <div>
    <div class="personal-information-top">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        label-position="right"
        class="form1"
      >
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="form.gender"
            placeholder="请选择"
            style="width:110px"
          >
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="头像">
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
        <el-form-item label="籍贯">
          <el-input v-model="form.live" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        label-position="right"
        class="form1"
      >
        <el-form-item label="现居">
          <el-input v-model="form.nowlive" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="form.company" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="职业">
          <el-input v-model="form.profession" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="院校">
          <el-input v-model="form.school" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="星座">
          <el-input v-model="form.constellation" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.wx" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        label-position="right"
        class="form3"
      >
        <el-form-item label="性格">
          <el-input type="textarea" v-model="form.character"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input type="textarea" v-model="form.hobby"></el-input>
        </el-form-item>
        <el-form-item label="人生格言">
          <el-input type="textarea" v-model="form.motto"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="personal-information-bottom">
      <el-button class="save" type="primary" @click="postInformation"
        >保存</el-button
      >
      <el-button class="cancel" type="primary">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getBloggerInformation, postBloggerInformation } from "@/api/api";
export default {
  data() {
    return {
      form: {
        nickname: "",
        name: "",
        gender: "",
        birthday: "",
        image: "",
        live: "",
        nowlive: "",
        company: "",
        profession: "",
        school: "",
        major: "",
        constellation: "",
        wx: "",
        email: "",
        character: "",
        hobby: "",
        motto: "",
      },
      sex: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
        {
          value: 0,
          label: "外星人",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getBloggerInformation().then((res) => {
        this.form = res.data[0];
      });
    },
    postInformation() {
      postBloggerInformation(this.form).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.init();
      });
    },
  },
};
</script>
<style lang="scss">
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
  width: 153px;
  height: 153px;
  line-height: 153px;
  text-align: center;
}
.avatar {
  width: 153px;
  height: 153px;
  display: block;
}
.image {
  width: 153px;
  height: 153px;
  display: block;
}

// 主要样式
.personal-information-top {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  .from1 {
    width: 300px;
  }
  .from2 {
    width: 300px;
  }
  .from3 {
    width: 300px;
  }
}
.personal-information-bottom {
  width: 1200px;
  text-align: center;
  margin-top: 30px;
  .cancel {
    margin-left: 30px;
  }
  // 修改文本域宽度,高度
  .el-textarea__inner {
    width: 300px;
    height: 146px;
  }
}
</style>
