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
}

export default new Article();
