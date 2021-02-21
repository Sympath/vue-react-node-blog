// 引入model层
import ArticleTypeInformation from "../../models/article-type";
import ArticleInformation from "../../models/article-information";

class Article {
  // 修改文章分类
  async adminEditArticleType(req, res) {
    const article_type = req.body;
    try {
      await ArticleTypeInformation.update({ article_type: article_type });
      res.send({
        message: "文章分类更新成功",
      });
    } catch (error) {}
  }

  // 获取文章所有分类
  async adminGetArticleType(req, res) {
    try {
      const article_types = await ArticleTypeInformation.find();
      res.send(article_types[0].article_type);
    } catch (error) {}
  }

  // 创建文章

  async adminCreateArticle(req, res) {
    try {
      const article = req.body;
      await ArticleInformation.create(article);
      res.send({
        message: "新建文章成功",
      });
    } catch (error) {}
  }

  //获取文章列表(包括条件查询)
  async adminArticleList(req, res) {
    const { category, title, current, limit } = req.query;
    if (category && title) {
      var listLength = await ArticleInformation.find({
        $and: [{ category: category }, { title: title }],
      });
      var list = await ArticleInformation.find({
        $and: [{ category: category }, { title: title }],
      })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else if (category || title) {
      var listLength = await ArticleInformation.find({
        $or: [{ category: category }, { title: title }],
      });
      var list = await ArticleInformation.find({
        $or: [{ category: category }, { title: title }],
      })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await ArticleInformation.find();
      var list = await ArticleInformation.find()
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    }
    if (listLength.length) {
      res.send({ list, total: listLength.length });
    } else {
      res.send({
        status: 220,
        type: "ERROR_LIST",
        message: "不存在该文章信息",
        list: [],
        total: listLength.length,
      });
    }
  }

  // 获取指定文章
  async adminGetArticle(req, res) {
    try {
      const id = req.query.id;
      const article = await ArticleInformation.findById(id);
      res.send({ article });
    } catch (error) {}
  }
  // 获取最近的一篇文章
  async adminGetRecentArticle(req, res) {
    try {
      const article = await ArticleInformation.find({})
        .sort({ _id: -1 })
        .limit(1);
      res.send({ article });
    } catch (error) {}
  }
  // 删除指定的文章
  async adminDeleteArticle(req, res) {
    try {
      const id = req.query.id;
      const ok = await ArticleInformation.findByIdAndDelete(id);
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

  async adminEditArticle(req, res) {
    try {
      const id = req.body._id;
      await ArticleInformation.findByIdAndUpdate(id, req.body);

      res.send({
        message: "文章修改成功",
      });
    } catch (error) {}
  }
}

export default new Article();
