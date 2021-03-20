// 引入model层
import ProjectInformation from "../../models/project-information";

class Project {
  //获取项目列表(包括条件查询)
  async userProjectList(req, res) {
    const { url, title, current, limit } = req.query;
    if (url && title) {
      var listLength = await ProjectInformation.find({
        $and: [{ url: url }, { title: title }],
      });
      var list = await ProjectInformation.find({
        $and: [{ url: url }, { title: title }],
      }).sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else if (url || title) {
      var listLength = await ProjectInformation.find({
        $or: [{ url: url }, { title: title }],
      });
      var list = await ProjectInformation.find({
        $or: [{ url: url }, { title: title }],
      }).sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await ProjectInformation.find();
      var list = await ProjectInformation.find().sort({_id: -1})
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    }
    if (listLength.length) {
      res.send({ list, total: listLength.length });
    } else {
      res.send({
        status: 220,
        type: "ERROR_LIST",
        message: "不存在该项目信息",
        list: [],
        total: listLength.length,
      });
    }
  }

}

export default new Project();
