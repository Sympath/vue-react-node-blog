import React from "react";
import { Select, Card, Spin } from "antd";
import { getProjectList } from "../../api/api";

import "../../assets/style/pages/project.scss";

const { Option } = Select;

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      projects_arr: [],
      image:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn21%2F446%2Fw640h606%2F20180423%2Fe1de-fzqvvsa0695367.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618211280&t=44c267ade434e93aa5e7ffcaaa8fdf69",
        isLoading: false,

    };
  }
  render() {
    return (
      <>
        <div className="project">
          
          <div className="projects">
          <Spin className="loading" tip="Loading..."  spinning={this.state.isLoading}>
         
            {this.state.projects_arr.map((item, index) => {
              return (
                <Card
                  title={item.title}
                  extra={
                    <div className="jump" onClick={()=>{this.jumpProjectCode(item.url)}}>查看项目</div>
                  }
                  className="project-item"
                  key={index}
                >
                  {/* <p className="article-content">{item.article}</p> */}
                  <div className="bottom">
                    <div className="bottom-left">
                     <p>
                      {item.introduce}
                     </p>
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
    getProjectList().then((res) => {
      this.setState({
        projects_arr: res.data.list,
        isLoading:false
      });
    });
  }
  jumpProjectCode(url){
    window.open(url)
  }
}
