// 引入model层
import BlogInformation from "../../models/blog-information";

class Website {

  // 获取关于博主内容
  
  async userGetWebsiteContent(req, res) {
    try {
        const obj = await BlogInformation.find();
        res.send({
          introduce: obj[0].introduce,
        });
    } catch (error) {}
  }
  
}

export default new Website();
