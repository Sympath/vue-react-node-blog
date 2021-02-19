// 引入model层
import BloggerInformation from "../../models/blogger-information";

class Personal {

  // 获取个人信息
  async adminGetBloggerInfor(req, res) {
    try {
      const infor = await BloggerInformation.find();
      res.send(infor);
    } catch (error) {}
  }
  // 修改个人信息
  async adminEditBloggerInfor(req, res) {
    try {
      const newinfor = await BloggerInformation.update(req.body);
      res.send({
        message: "个人信息更新成功"
      });
    } catch (error) {}
  }

  // 修改个人标签
  async adminEditBloggerLabel(req,res){
    const label = req.body
    try {
      const newlabel = await BloggerInformation.update({label:label});
      res.send({
        message: "个人标签更新成功"
      });
    } catch (error) {}
  }

  // 获取个人标签
  async adminGetBloggerLabel(req,res){
    try {
      const infor = await BloggerInformation.find();
      res.send(infor[0].label);
    } catch (error) {}
  }

  // 修改个人经历
  async adminEditBloggerExperience(req,res){
   
    try {
      const new_experience = await BloggerInformation.update({experience: req.body.experience});
      res.send({
        message: "个人经历更新成功"
      });
    } catch (error) {}
  } 
  // 获取
  async adminGetBloggerExperience(req,res){
   
    try {
      const infor = await BloggerInformation.find();
      res.send(infor[0].experience);
    } catch (error) {}
  } 
  
}

export default new Personal();
