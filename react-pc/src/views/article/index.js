import React from "react";
import { Link } from "react-router-dom";
import { Select, Card, Spin } from "antd";
import { getArticleList } from "../../api/api";

import "../../assets/style/pages/article.scss";

const { Option } = Select;

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      articles_arr: [],
      image:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn21%2F446%2Fw640h606%2F20180423%2Fe1de-fzqvvsa0695367.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618211280&t=44c267ade434e93aa5e7ffcaaa8fdf69",
        isLoading: false,

    };
  }
  render() {
    return (
      <>
        <div className="article">
          <div className="article-search">
            <Select
              showSearch
              style={{
                width: 200,
                height: 30,
                marginTop: "10px",
                marginRight: "10px",
              }}
              className="search-select"
              placeholder="选择文章分类进行查询"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>
          <div className="articles">
          <Spin className="loading" tip="Loading..." spinning={this.state.isLoading}>
         
            {this.state.articles_arr.map((item, index) => {
              return (
                <Card
                  title={item.title}
                  extra={
                    <Link to={`/detail/${item._id}`}>查看文章</Link>
                  }
                  className="article-item"
                  key={index}
                >
                  {/* <p className="article-content">{item.article}</p> */}
                  <div className="bottom">
                    <div className="bottom-left">
                      <span>阅读量：{item.read}</span>
                      <span>点赞量：{item.like}</span>
                      <span>评论量：{item.like}</span>
                    </div>
                    <div className="bottom-right">
                      <span>{item.create_time}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
             </Spin>
          </div>
          
        </div>
        
      </>
    );
  }
  componentWillMount() {
    this.init();
  }
  init() {
    this.setState({
      isLoading:true
    });
    getArticleList().then((res) => {
      this.setState({
        articles_arr: res.data.list,
        isLoading:false
      });
    });
  }
}
