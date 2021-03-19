// 引入model层
import ArticleTypeInformation from "../../models/article-type";
import ArticleInformation from "../../models/article-information";
import UserInformation from "../../models/user-information";

class Article {
  // 获取文章所有分类
  async adminGetArticleType(req, res) {
    try {
      const article_types = await ArticleTypeInformation.find();
      res.send(article_types[0].article_type);
    } catch (error) {}
  }

  //获取文章列表(包括条件查询)
  async userArticleList(req, res) {
    const { category, title, current, limit } = req.query;
    if (category && title) {
      var listLength = await ArticleInformation.find({
        $and: [{ category: category }, { title: title }],
      });
      var list = await ArticleInformation.find({
        $and: [{ category: category }, { title: title }],
      })
        .sort({ _id: -1 })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else if (category || title) {
      var listLength = await ArticleInformation.find({
        $or: [{ category: category }, { title: title }],
      });
      var list = await ArticleInformation.find({
        $or: [{ category: category }, { title: title }],
      })
        .sort({ _id: -1 })
        .skip((current - 1) * limit)
        .limit(parseInt(limit));
    } else {
      var listLength = await ArticleInformation.find();
      var list = await ArticleInformation.find()
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
        message: "不存在该文章信息",
        list: [],
        total: listLength.length,
      });
    }
  }

  // 增加文章阅读量
  async userPostArticleRead(req, res) {
    console.log(req.body.id);
    try {
      const id = req.body.id;
      const old_article = await ArticleInformation.findById(id);
      await ArticleInformation.findByIdAndUpdate(id, {
        read: old_article.read + 1,
      });
      const article = await ArticleInformation.findById(id);
      res.send({ article });
    } catch (error) {}
  }
  // 点赞
  async userPostArticleLike(req, res) {
    console.log(req.body.id);
    try {
      const id = req.body.id;
      const old_article = await ArticleInformation.findById(id);
      await ArticleInformation.findByIdAndUpdate(id, {
        like: old_article.like + 1,
      });
      const article = await ArticleInformation.findById(id);
      res.send({ article });
    } catch (error) {}
  }

  // 获取指定文章
  async userGetArticle(req, res) {
    try {
      const id = req.query.id;
      const article = await ArticleInformation.findById(id);
      res.send({ article });
    } catch (error) {}
  }

  // 评论文章
  async userPostArticleComment(req, res) {
    const { articleId, userId, comment_txt ,comment_time} = req.body;
    try {
      const user = await UserInformation.findById(userId);
      const article = await ArticleInformation.findById(articleId);
      article.comments.push({
        userId: userId,
        articleId: articleId,
        comment_txt: comment_txt,
        comment_time:comment_time,
        nackname:user.nackname
      });
      const new_article = await ArticleInformation.findByIdAndUpdate(articleId,{
        comments: article.comments
      })
      res.send({
        message:'评论成功'
      })
    } catch (error) {}
  }
}

export default new Article();
