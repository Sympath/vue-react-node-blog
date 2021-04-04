// 引入model层
import ArticleInformation from "../../models/article-information";

class Comment {
  //获取文章列表(包括条件查询)
  async adminCommentList(req, res) {
    const { title, current, limit } = req.query;
    if (title) {
      var list = await ArticleInformation.find({ title: title });
      var comments = [];
      list.map((v, i) => {
        comments = comments.concat(v.comments);
      });
    } else {
      var list = await ArticleInformation.find();
      var comments = [];
      list.map((v, i) => {
        comments = comments.concat(v.comments);
      });
    }
    res.send({ comments, total: comments.length });
  }

  // 删除指定评论
  async adminCommentDelete(req, res) {
    const { id, articleId } = req.query;
    console.log(id, articleId);

    try {
      var article = await ArticleInformation.findById(articleId);
      console.log(article.comments, "33333333");
      article.comments.map((v, i) => {
        if (id == v.id) {
          article.comments.splice(article[i], 1);
          return false;
        }
      });

      let ok = await ArticleInformation.findByIdAndUpdate(articleId, {
        comments: article.comments,
      });
      if (ok) {
        res.send({
          message: "删除评论成功!",
        });
      } else {
        res.send({
          message: "删除评论失败!",
        });
      }
    } catch (error) {}
  }
}

export default new Comment();
