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
  // 获取关于博主内容
  
  async userGetBloggerContent(req, res) {
    try {
      const infor = await BloggerInformation.find();
      res.send({experience:infor[0].experience});
    } catch (error) {}
  }
  
}

export default new BloggerInfor();
