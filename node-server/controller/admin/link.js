// 引入model层
import LinkInformation from "../../models/link-information";

class Link {
  // 新建友链
  async adminLinkCreate(req, res) {
    try {
      const link = await LinkInformation.create(req.body);
      res.send({
        message: "友链创建成功！"
      });
    } catch (error) {}
  }
  // 删除友链
  async adminLinkDelete(req, res) {
    try {
      const id = req.query.id;
      const ok = await LinkInformation.findByIdAndDelete(id);
      if (ok) {
        res.send({
          message: "友链删除成功！",
        });
      } else {
        res.send({
          message: "友链删除失败！",
          status: 500,
        });
      }
    } catch (error) {}
  }
  
  // 获取友链列表(包括条件查询)
  async adminLinkList(req, res) {
    const { author, blog_name, current, limit } = req.query;
    if (author && blog_name) {
      var listLength = await LinkInformation.find({
        $and: [{ author: author }, { blog_name: blog_name }],
      });
      var list = await LinkInformation.find({
        $and: [{ author: author }, { blog_name: blog_name }],
      })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else if (author || blog_name) {
      var listLength = await LinkInformation.find({
        $or: [{ author: author }, { blog_name: blog_name }],
      });
      var list = await LinkInformation.find({
        $or: [{ author: author }, { blog_name: blog_name }],
      })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await LinkInformation.find();
      var list = await LinkInformation.find()
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    }
    if (listLength.length) {
      res.send({ list, total: listLength.length });
    } else {
      res.send({
        status: 220,
        type: "ERROR_LIST",
        message: "不存在该友链!",
        list: [],
        total: listLength.length,
      });
    }
  }
  async adminEditLink(req, res) {
    try {
      const id = req.body._id;
      await LinkInformation.findByIdAndUpdate(id, req.body);

      res.send({
        message: "友链修改成功!",
      });
    } catch (error) {}
  }
}

export default new Link();
