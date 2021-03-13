import React from "react";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { Button, Modal, Input ,message} from "antd";
import {
  LoginOutlined,
  FireOutlined,
  ReadOutlined,
  ProjectOutlined,
  MessageOutlined,
  ChromeOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import "../assets/style/compontents/nav.scss";
import {userLogin } from '../api/api'

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalVisible: false,
      account:'',
      password:''
    };
    this._login = this._login.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 
  render() {
    return (
      <div className="nav">
        <Router>
          <div className="nav-left">
            <NavLink to="/recommend">
              <FireOutlined />
              <span>博主推荐</span>
            </NavLink>
            <NavLink to="/article">
              <ReadOutlined />
              <span> 技术文章</span>
            </NavLink>
            <NavLink to="/project">
              <ProjectOutlined />
              <span> 项目源码</span>
            </NavLink>
            <NavLink to="/message">
              <MessageOutlined />
              <span>给我留言</span>
            </NavLink>
            <NavLink to="/website">
              <ChromeOutlined />
              <span>关于网站</span>
            </NavLink>
            <NavLink to="/blogger">
              <UserOutlined />
              <span>关于博主</span>
            </NavLink>
          </div>
          <div className="nav-right">
            <Button type="primary" onClick={this.loginModelShow}>
              <LoginOutlined />登 录
            </Button>
            <Button className="register" type="danger">
              <LogoutOutlined />注 册
            </Button>
          </div>
          <Modal
            className="login-model"
            title="登 录"
            visible={this.state.isLoginModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <div>
              <Input
                className="account"
                size="large"
                style={{ marginBottom: 20 }}
                placeholder="请输入账号"
                name="account"
                value={this.state.account}
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
                onChange={this.handleChange}
              />
              <Input
                className="password"
                size="large"
                style={{ marginBottom: 20 }}
                type="password"
                name="password"
                placeholder="请输入密码"
                value={this.state.password}
                prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
                onChange={this.handleChange}
              />
              <div className="login-submit">
                <Button
                  style={{ width: "100%", marginBottom: "20px" }}
                  type="primary"
                  onClick={this._login}
                >
                  登录
                </Button>
                <Button style={{ width: "100%" }} onClick={this.handleOAuth}>
                  github 授权登录
                </Button>
              </div>
            </div>
          </Modal>
        </Router>
      </div>
    );
  }

  loginModelShow = () => {
    this.setState({
      isLoginModalVisible: true,
    });
  };
  handleOk = () => {
    this.setState({
      isLoginModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isLoginModalVisible: false,
    });
  };

  // 实现类似vue的双向绑定
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * 业务代码
   */

   // 登录
   _login=()=>{
    userLogin({
      account:this.state.account,
      password:this.state.password
    }).then(res=>{
      this.setState({
        isLoginModalVisible: false,
      });
      message.success(res.data.message);
     
    })
  }
}
