// 引入model层
import BloggerInformation from "../../models/blogger-information";

class Personal {
  async adminGetBloggerInfor(req, res) {
    try {
      const infor = await BloggerInformation.find();
      res.send(infor);
    } catch (error) {}
  }
  async adminEditBloggerInfor(req, res) {
    try {
      const newinfor = await BloggerInformation.update(req.body);
      res.send({
        message: "个人信息保存成功"
      });
    } catch (error) {}
  }
}

export default new Personal();
