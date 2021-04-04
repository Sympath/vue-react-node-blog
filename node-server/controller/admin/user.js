// 引入model层
import UserInformation from "../../models/user-information";

class User {
 
  //获取文章列表(包括条件查询)
  async adminUserList(req, res) {
    const { account, nackname, current, limit } = req.query;
    if (account && nackname) {
      var listLength = await UserInformation.find({
        $and: [{ account: account }, { nackname: nackname }],
      });
      var list = await UserInformation.find({
        $and: [{ account: account }, { nackname: nackname }],
      }).sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else if (account || nackname) {
      var listLength = await UserInformation.find({
        $or: [{ account: account }, { nackname: nackname }],
      });
      var list = await UserInformation.find({
        $or: [{ account: account }, { nackname: nackname }],
      }).sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await UserInformation.find();
      var list = await UserInformation.find().sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    }
    if (listLength.length) {
      res.send({ list, total: listLength.length });
    } else {
      res.send({
        status: 220,
        type: "ERROR_LIST",
        message: "不存在该用户信息",
        list: [],
        total: listLength.length,
      });
    }
  }

  // 注销指定的用户
  async adminUserDelete(req, res) {
    try {
      const id = req.query.id;
      const ok = await UserInformation.findByIdAndDelete(id);
      if (ok) {
        res.send({
          message: "用户注销成功!",
        });
      } else {
        res.send({
          message: "用户注销失败",
          status: 500,
        });
      }
    } catch (error) {}
  }
}

export default new User();
