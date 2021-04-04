// 引入model层
import MessageInformation from "../../models/message-information";

class Message {
  //获取文章列表(包括条件查询)
  async adminMessageList(req, res) {
      
    const { nackname, current, limit } = req.query;
    console.log(nackname);
    if (nackname) {
      var listLength = await MessageInformation.find({ nackname: nackname });
      var list = await MessageInformation.find({ nackname: nackname })
        .sort({ _id: -1 })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await MessageInformation.find();
      var list = await MessageInformation.find()
        .sort({ _id: -1 })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    }

    if (listLength.length) {
      res.send({ list, total: listLength.length });
    } else {
      res.send({
        status: 220,
        type: "ERROR_LIST",
        message: "不存在该留言",
        list: [],
        total: listLength.length,
      });
    }
  }

  // 注销指定的用户
  async adminMessageDelete(req, res) {
    try {
      const id = req.query.id;
      const ok = await MessageInformation.findByIdAndDelete(id);
      if (ok) {
        res.send({
          message: "删除留言成功!",
        });
      } else {
        res.send({
          message: "删除留言失败",
          status: 500,
        });
      }
    } catch (error) {}
  }
}

export default new Message();
