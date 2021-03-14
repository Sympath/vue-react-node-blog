// 引入model层
import ProjectInformation from "../../models/project-information";

class Project {
  // 创建项目
  async adminCreateProject(req, res) {
    try {
      const project = req.body;
      await ProjectInformation.create(project);
      res.send({
        message: "新建项目成功",
      });
    } catch (error) {}
  }

  //获取项目列表(包括条件查询)
  async adminProjectList(req, res) {
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

  // 获取指定项目
  async adminGetProject(req, res) {
    try {
      const id = req.query.id;
      const project = await ProjectInformation.findById(id);
      res.send({ project });
    } catch (error) {}
  }
  // 获取最近的一个项目
  async adminGetRecentProject(req, res) {
    try {
      const project = await ProjectInformation.find({})
        .sort({ _id: -1 })
        .limit(1);
      res.send({ project });
    } catch (error) {}
  }
  // 删除指定的文章
  async adminDeleteProject(req, res) {
    try {
      const id = req.query.id;
      const ok = await ProjectInformation.findByIdAndDelete(id);
      if (ok) {
        res.send({
          message: "文章删除成功",
        });
      } else {
        res.send({
          message: "文章删除失败",
          status: 500,
        });
      }
    } catch (error) {}
  }
  // 修改指定的文章

  async adminEditProject(req, res) {
    try {
      const id = req.body._id;
      await ProjectInformation.findByIdAndUpdate(id, req.body);

      res.send({
        message: "文章修改成功",
      });
    } catch (error) {}
  }
}

export default new Project();
