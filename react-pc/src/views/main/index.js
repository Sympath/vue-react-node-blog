import React from "react";
import RootRouter from "../../router/index";
import { Button, notification } from "antd";

import Tags from "../../compontents/tags";
import Information from "../../compontents/information";
import Nav from "../../compontents/nav";

import {
  getBloggerInfor,
  getTypeArticleProjectNums,
  getBloggerFriendLink,
} from "../../api/api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloggerInfor: {
        name: "fujinting",
        image:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn21%2F446%2Fw640h606%2F20180423%2Fe1de-fzqvvsa0695367.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618211280&t=44c267ade434e93aa5e7ffcaaa8fdf69",
        motto: "typescript大佬",
        label: ["学习", "吃饭", "睡觉", "蹲坑"],
      },
      typartpronums: {
        article_nums: 0,
        project_nums: 0,
        type_nums: 0,
      },
      friendLink: [],
      boxIsShow: false,
    };
  }
  render() {
    return (
      <>
        <div className="main">
          <div className="header">
            <Nav />
          </div>
          <div className="bodyer">
            <div className="content">
              <RootRouter />
            </div>
            <div className="sider">
              <Information
                bloggerInfor={this.state.bloggerInfor}
                typartpronums={this.state.typartpronums}
              />
              <Tags
                bloggerInfor={this.state.bloggerInfor}
                friendLink={this.state.friendLink}
              />
            </div>
          </div>
          <div className="footer"></div>
          {/* 在线聊天 */}
          <div className="chat-box" draggable="true">
            <img
              src={require("../../assets/images/聊天.png").default}
              width="60"
              height="60"
              alt="聊天盒子"
              onClick={this.chatBoxShow}
            />
            <div
              className="choose-chatways"
              style={{ display: this.state.boxIsShow ? "flex" : "none" }}
            >
              <div onClick={this.intoSinglePage}>进入与博主私聊</div>
              <div onClick={this.intoGroupPage}>进入与多人聊天</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 获取博主个人信息
  getBloggerSideInfor() {
    getBloggerInfor().then((res) => {
      this.setState({
        bloggerInfor: res.data[0],
      });
    });
  }
  // 获取友链信息
  getBloggerSideFriend() {
    getBloggerFriendLink().then((res) => {
      console.log(res.data.list);
      this.setState({
        friendLink: res.data.list,
      });
    });
  }
  // 获取分类数量，文章数量，项目数量
  getSideTypArtProNums() {
    getTypeArticleProjectNums().then((res) => {
      this.setState({
        typartpronums: res.data,
      });
    });
  }
  componentWillMount() {
    // 弹出公告
    openNotification();
    // 获取侧边栏博主信息
    this.getBloggerSideInfor();
    this.getBloggerSideFriend();
    this.getSideTypArtProNums();
  }

  // 聊天盒子显示
  chatBoxShow = () => {
    console.log('11')
    this.setState({
      boxIsShow: !this.state.boxIsShow,
    });
  };

  // 进入单聊页面
  intoSinglePage=()=>{
    window.location.href="http://localhost:8080/#/singleChat"
  }
  // 进入群聊页面
  intoGroupPage=()=>{
    window.location.href="http://localhost:8080/#/groupChat"
  }
}

// 公告内容

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      知道了
    </Button>
  );
  notification.open({
    message: "公告",
    description: "欢迎来到付金廷的博客网站",
    btn,
    key,
    onClose: close,
    duration: 3,
  });
};
