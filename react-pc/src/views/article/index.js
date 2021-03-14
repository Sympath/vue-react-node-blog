import React from "react";
import { Select } from "antd";
import { getArticleList } from "../../api/api";

import "../../assets/style/pages/article.scss";

const { Option } = Select;

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      articles_arr: [],
      image:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn21%2F446%2Fw640h606%2F20180423%2Fe1de-fzqvvsa0695367.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618211280&t=44c267ade434e93aa5e7ffcaaa8fdf69",
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
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "10px",
              }}
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
            {this.state.articles_arr.map((item, index) => {
              return (
                <div
                  className="article-item"
                  onClick={() => {
                    this.inDetailArticlePage(item._id);
                  }}
                  key={index}
                >
                  <div className="item-left">
                    <h2>{item.title}</h2>
                    <p>{item.article}</p>
                    <div>
                      <div className="read-commit-star">
                        <span> 浏览:{item.read}</span>
                        <span> 评论:{item.like}</span>
                        <span> 点赞:{item.like}</span>
                      </div>
                      <div className="time">时间：{item.create_time}</div>
                    </div>
                  </div>
                  <div className="item-right">
                    <img
                      src={item.image ? item.image : this.state.image}
                      alt="一张图片"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  componentWillMount() {
    this.init();
  }
  init() {
    getArticleList().then((res) => {
      this.setState({
        articles_arr: res.data.list,
      });
    });
  }
  inDetailArticlePage(id) {
    console.log(id);
    // 跳转到详情页
    this.props.history.push("/detail/article", {
      article_id: id,
    });
  }
}
