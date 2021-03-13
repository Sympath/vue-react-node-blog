// 引入model层
import BloggerInformation from "../../models/blogger-information";

class BloggerInfor {

  // 获取个人信息
  async userGetBloggerInfor(req, res) {
    try {
      const infor = await BloggerInformation.find();
      res.send(infor);
    } catch (error) {}
  }
  
}

export default new BloggerInfor();
