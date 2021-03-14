import React from "react";
import { Divider } from "antd";
import "../assets/style/compontents/information.scss";

export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    

  }
  render() {
    return (
      <div className="information">
        <Divider style={{ width: "80%" ,marginTop:"45px"}}>博主 · 简介</Divider>
        <img src={this.props.bloggerInfor.image} alt="头像" />
        <h2>{this.props.bloggerInfor.name}</h2>
        <div className="infor-content">{this.props.bloggerInfor.motto}</div>
        <div className="product-nums">
          <span>
            <div>{this.props.typartpronums.type_nums}</div>
            <div>分类</div>
          </span>
          <span>
            <div>{this.props.typartpronums.article_nums}</div>
            <div>文章</div>
          </span>
          <span className="infor-project">
            <div>{this.props.typartpronums.project_nums}</div>
            <div>项目</div>
          </span>
        </div>
        <div className="infor-other"></div>
      </div>
    );
  }

 
}
