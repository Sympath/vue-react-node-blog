// 引入加密
import bcrypt from "bcryptjs";

// 引入生成token
import jwt from "jsonwebtoken";

// 引入model层
import UserInformation from "../../models/user-information";

class UserLoginReset {
  //  用户登录
  async userLogin(req, res) {
    const { account, password } = req.body;
    // 验证此用户是否存在
    try {
      const user = await UserInformation.findOne({ account }).select(
        "+password"
      );
      if (!user) {
        res.send({
          status: 210,
          type: "ERROR_ACCOUNT",
          message: "不存在此用户",
        });
      }

      //验证用户密码是否正确
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        res.send({
          status: 211,
          type: "ERROR_ACCOUNT",
          message: "密码错误",
        });
      } else {
        // 账号密码都正确时,返回成功和token
        const userToken = jwt.sign({ id: user._id }, req.app.get("secret"));
        res.send({
          status: 200,
          token: userToken,
          message:"登录成功!"
        });
      }
    } catch (error) {}
  }

  // 用户注册
  async userRegister(req, res) {
   console.log(req.body);
   const adminer = await UserInformation.create(req.body)
   res.send({
     message:"注册成功!"
   })

  }
}

export default new UserLoginReset();
