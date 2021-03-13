// 引入model层
import ArticleTypeInformation from "../../models/article-type";
import ArticleInformation from "../../models/article-information"
import ProjectInformation from "../../models/project-information";



class Dictionary {

  // 获取文章分类数量,文章数量，项目数量
  async userGetCateArticleProjectNums(req, res) {
    try {
        
        const article_types = await ArticleTypeInformation.find();
        const articles = await ArticleInformation.find();
        const projects = await ProjectInformation.find();

        const type_nums = article_types[0].article_type.length;
        const article_nums = articles.length;
        const project_nums = projects.length;
        res.send({
            type_nums:type_nums,
            article_nums:article_nums,
            project_nums:project_nums
        })
    } catch (error) {}

    
  }

  
  
}

export default new Dictionary();
