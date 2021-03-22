// 引入model层
import BlogInformation from "../../models/blog-information";

class Blog {
  async adminGetBlogIntroduce(req, res) {
    try {
      const obj = await BlogInformation.find();
      res.send({
        introduce: obj[0].introduce,
      });
    } catch (error) {}
  }
  async adminEditBlogIntroduce(req, res) {
      console.log(req.body);
    try {
        const new_introduce = await BlogInformation.update({introduce: req.body.blog});
      res.send({
        message: "个人经历更新成功"
      });
      } catch (error) {}
    
  }
  
}

export default new Blog();
