import React from "react";
import RootRouter from "../../router/index";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
export default function Home() {
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <Router>
            <NavLink to="/login">登录</NavLink>
            <NavLink to="/about">关于</NavLink>
          </Router>
        </Header>
        <Layout>
          <Content　className="content">
            <RootRouter />
          </Content>
          <Sider className="sider"></Sider>
        </Layout>
        <Footer className="footer"></Footer>
      </Layout>
    </>
  );
}
