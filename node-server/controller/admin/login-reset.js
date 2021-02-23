// 引入加密
import bcrypt from "bcryptjs";

// 引入生成token
import jwt from "jsonwebtoken";

// 引入model层
import AdminInformation from "../../models/admin-information";

class AdminLoginReset {
  async adminLogin(req, res) {
    const { account, password } = req.body;
    // 验证此用户是否存在
    try {
      const user = await AdminInformation.findOne({ account }).select(
        "+password"
      );
      if (!user) {
        res.send({
          status: 210,
          type: "ERROR_ACCOUNT",
          message: "此用户不存在",
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
        });
      }
    } catch (error) {}
  }
  async adminReset(req, res) {
    // 验证是否有此管理员
    const { account, password, new_password } = req.body;
    try {
      const user = await AdminInformation.findOne({ account }).select(
        "+password"
      );
      if (!user) {
        res.send({
          status: 210,
          type: "ERROR_ACCOUNT",
          message: "该用户不存在",
        });
      }

      //验证用户原密码是否正确
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        res.send({
          status: 212,
          type: "ERROR_ACCOUNT",
          message: "原密码错误",
        });
      } else {
        // 账号密码都正确时,返回成功和token
        const result = await AdminInformation.update({
          password: new_password,
        });
        if(result){
          res.send({
            message:'密码修改成功'
          });
        }
      }
    } catch (error) {}
  }
}

export default new AdminLoginReset();
