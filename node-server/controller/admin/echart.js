// 引入model层
import ArticleInformation from "../../models/article-information";
import ArticleTypeInformation from "../../models/article-type";

class Echart {
  async adminGetEchartData(req, res) {
    /**
     *   1. 获取第一个图表的 文章分类 和 文章分类对应的数量
     */

    //获取文章分类中的数量
    const article_types = await ArticleTypeInformation.find();
    console.log(article_types[0].article_type);
    var article_type = article_types[0].article_type;
    var arr = [];
    // map中无法使用map或foreach
    for (let i = 0; i < article_type.length; i++) {
      let obj = {};
      let a = await ArticleInformation.find({ category: article_type[i] });
      obj.name = article_type[i];
      obj.value = a.length;
      arr.push(obj);
    }

    
    /**
     *  2. 获取第二个图表 (文章)推荐和未推荐的数量
     */
     let allrec = await ArticleInformation.find();
     let allrecommends = allrec.length;

     let rec = await ArticleInformation.find({ isCommend: true });
     let recommend=rec.length;

     let n_recommend = allrecommends - recommend ;
     

    /**
     *  3. 获取 第三个个图表 (文章)公开和未公开的数量
     */
     let allpub= await ArticleInformation.find();
     let allpublic = allpub.length;

     let pub = await ArticleInformation.find({ isPublic: true });
     let isPublic=pub.length;

     let n_isPublic = allpublic - isPublic ;

    /**
     * 合成对象
     */
    let echartObj = new Object()
    echartObj.category= arr;
    echartObj.isRecommend = recommend;
    echartObj.nIsRecommend = n_recommend;
    echartObj.isPublic = isPublic;
    echartObj.nIsPublic = n_isPublic;
    res.send(echartObj)
  }
}

export default new Echart();
