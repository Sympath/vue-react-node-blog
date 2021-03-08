import React from "react";
import RootRouter from "../../router/index";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { Layout, Button } from "antd";
import {
  LoginOutlined,
  FireOutlined,
  ReadOutlined,
  ProjectOutlined,
  MessageOutlined,
  ChromeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Tags from "../../compontents/tags";
import Information from "../../compontents/information";
import { notification } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Layout className="layout">
          <Header className="header">
            <Router>
              <div className="nav">
                <NavLink to="/recommend">
                  <FireOutlined />
                  <span>博主推荐</span>
                </NavLink>
                <NavLink to="/about">
                  <ReadOutlined />
                  <span> 技术文章</span>
                </NavLink>
                <NavLink to="/login">
                  <ProjectOutlined />
                  <span> 项目源码</span>
                </NavLink>
                <NavLink to="/login">
                  <MessageOutlined />
                  <span>给我留言</span>
                </NavLink>
                <NavLink to="/about">
                  <ChromeOutlined />
                  <span>关于网站</span>
                </NavLink>
                <NavLink to="/about">
                  <UserOutlined />
                  <span>关于博主</span>
                </NavLink>
              </div>
              <div className="nav-btn">
                <Button type="primary" onClick={openNotification}>
                  <LoginOutlined />
                  
                  登录
                </Button>
                <Button type="danger">
                  <LoginOutlined />
                  注册
                </Button>
              </div>
            </Router>
          </Header>
          <Layout>
            <Content className="content">
              <RootRouter />
            </Content>
            <Sider className="sider" width="20%">
              <Information />
              <Tags />
            </Sider>
          </Layout>
          <Footer className="footer"></Footer>
        </Layout>
      </>
    );
  }

  componentWillMount(){
    openNotification()
  }
  
  
}

// 公告内容

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: '公告',
    description:
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    btn,
    key,
    onClose: close,
  });
};