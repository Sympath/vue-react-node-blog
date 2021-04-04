// 引入model层
import ArticleInformation from "../../models/article-information";
import ArticleTypeInformation from "../../models/article-type";


class Echart {
  async adminGetEchartData(req, res) {
   /**
    * 获取第一个图表的 文章分类 和 文章分类对应的数量
    */

    //获取文章分类中的数量
    // const article_types = await ArticleTypeInformation.find();
    // console.log(article_types[0].article_type);
    // var article_type = article_types[0].article_type
    // article_type.map((v,i)=>{
    //      let a = await ArticleInformation.find({category:v})
    //      console.log(a);
    // })
  }
  
}

export default new Echart();
