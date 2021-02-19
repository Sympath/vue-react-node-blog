// 引入model层
import PublishInformation from "../../models/publish-information";

class Publish {
  // 新建公告
  async adminPostPublishNotice(req, res) {
    try {
      const notice = await PublishInformation.create(req.body);
      res.send({
        message: "公告发布成功"
      });
    } catch (error) {}
  }

  // 获取历史公告
  async adminGetPublishNotice(req, res) {
    try {
      const notices = await PublishInformation.find();
      console.log(notices);
      res.send(notices);
    } catch (error) {}
  }
}

export default new Publish();
