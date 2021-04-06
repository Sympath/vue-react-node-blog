// 引入model层
import LinkInformation from "../../models/link-information";

class Link {
 
  // 获取友链列表
  async userLinkList(req, res) {
      var list = await LinkInformation.find()
       res.send({list})
  }
  
}

export default new Link();
