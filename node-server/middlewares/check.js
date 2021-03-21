import jwt from "jsonwebtoken";
import AdminInformation from "../models/admin-information";
// 中间件 验证token
class Check {
  async checkToken(req, res, next) {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    if (token) {
      const { id } = jwt.verify(token, req.app.get("secret"));
      const infor = await AdminInformation.findById(id);
      if (infor) {
        next();
      } else {
        res.send("你没有权限哦");
      }
    } else {
      res.send("你没有权限哦");
    }
  }
}
export default new Check();
