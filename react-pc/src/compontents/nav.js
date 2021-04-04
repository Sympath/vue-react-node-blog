import React from "react";
import { NavLink, HashRouter as Router } from "react-router-dom";
import { Button, Modal, Input, message } from "antd";
import { Avatar, Image } from 'antd';
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
  SmileOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "../assets/style/compontents/nav.scss";
import { userLogin, userRegister, userGithubLogin } from "../api/api";
import { setLocalStorage,getLocalStorage } from "../utils/local-storage";
import config from "../utils/config";
import { getQueryStringByName } from "../utils/utils";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalVisible: false,
      isRegisterModalVisible: false,
      account: "",
      password: "",
      nackname: "",
      code: "",
      btnIsShow:true
    };
    this._login = this._login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="nav">
        <Router>
          <div className="nav-left">
            <NavLink to="/recommend" style={{ fontWeight: 600}}>
              <FireOutlined />
              <span style={{fontSize:18}}>博主推荐</span>
            </NavLink>
            <NavLink to="/article" style={{ fontWeight: 600 }}>
              <ReadOutlined />
              <span style={{fontSize:18}}> 技术文章</span>
            </NavLink>
            <NavLink to="/project" style={{ fontWeight: 600 }}>
              <ProjectOutlined />
              <span style={{fontSize:18}}> 项目源码</span>
            </NavLink>
            <NavLink to="/message" style={{ fontWeight: 600 }}>
              <MessageOutlined />
              <span style={{fontSize:18}}>给我留言</span>
            </NavLink>
            <NavLink to="/website" style={{ fontWeight: 600 }}>
              <ChromeOutlined />
              <span style={{fontSize:18}}>关于网站</span>
            </NavLink>
            <NavLink to="/blogger" style={{ fontWeight: 600 }}>
              <UserOutlined />
              <span style={{fontSize:18}}>关于博主</span>
            </NavLink>
          </div>
          <div className="nav-right" >
            <Button
              style={{display:this.state.btnIsShow?'block':'none'}}
              className="login-btn"
              type="primary"
              onClick={this.loginModelShow}
            >
              <LoginOutlined />登 录
            </Button>
            <Button style={{display:this.state.btnIsShow?'block':'none'}} className="register-btn" onClick={this.registerModelShow}>
              <LogoutOutlined />注 册
            </Button>
            <div className="user-avatar"  style={{display:!this.state.btnIsShow?'flex':'none'}}>
            <Avatar
           
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
            />
            </div>
           

          </div>

          {/* 登录的model */}
          <Modal
            className="login-model"
            title="登录账号"
            visible={this.state.isLoginModalVisible}
            onCancel={this.handleCancelLogin}
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
                prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                onChange={this.handleChange}
              />
              <div className="login-submit">
                <Button
                  style={{ width: "100%", marginBottom: "20px" }}
                  type="primary"
                  onClick={this._login}
                >
                  登 录
                </Button>
                <Button style={{ width: "100%",background:'#67C23A' ,color:'#fff'}} onClick={this.handleOAuth}>
                  QQ 扫码登录
                </Button>
                <Button style={{ width: "100%",marginTop:'20px' }} onClick={this.handleOAuth}>
                  github 授权登录
                </Button>
              </div>
            </div>
          </Modal>

          {/* 注册的Model */}
          <Modal
            className="register-model"
            title="注册账号"
            visible={this.state.isRegisterModalVisible}
            onCancel={this.handleCancelRegister}
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
                prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                onChange={this.handleChange}
              />
              <Input
                className="nackname"
                size="large"
                style={{ marginBottom: 20 }}
                name="nackname"
                placeholder="请输入昵称 (可不填，系统随机生成)"
                value={this.state.nackname}
                prefix={<SmileOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                onChange={this.handleChange}
              />
              <div className="login-submit">
                <Button
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    backgroundColor: "#67C23A",
                    color: "#fff",
                  }}
                  onClick={this._register}
                >
                  注 册
                </Button>
                <Button type="danger" style={{ width: "100%" }}>
                  取 消
                </Button>
              </div>
            </div>
          </Modal>
        </Router>
      </div>
    );
  }

  // 登录框显示
  loginModelShow = () => {
    message.info("推荐您使用QQ扫码登录！");
    this.setState({
      isLoginModalVisible: true,
    });
  };
  // 注册框显示
  registerModelShow = () => {
    this.setState({
      isRegisterModalVisible: true,
    });
  };
  // 登录框消失
  handleCancelLogin = () => {
    this.setState({
      isLoginModalVisible: false,
    });
  };
  // 注册框消失
  handleCancelRegister = () => {
    this.setState({
      isRegisterModalVisible: false,
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
  _login = () => {
    userLogin({
      account: this.state.account,
      password: this.state.password,
    }).then((res) => {
      this.setState({
        isLoginModalVisible: false,
        account: "",
        password: "",
        nackname: "",
        btnIsShow:false
      });
      message.success(res.data.message);
      console.log("2");
      setLocalStorage({
        token: res.data.token,
        nackname: res.data.nackname,
        user_id: res.data.user_id,
      });
    });
  };
  // 注册
  _register = () => {
    userRegister({
      account: this.state.account,
      password: this.state.password,
      nackname: this.state.nackname,
      register_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }).then((res) => {
      this.setState({
        isRegisterModalVisible: false,
        account: "",
        password: "",
        nackname: "",
      });
      message.success(res.data.message);
    });
  };

  // 点击github授权登录
  handleOAuth = () => {
    /**
     *  setLocalStorage({
          beforeUrl: window.location.href,
        });
        window.location.href = `${config.oauth_url}?client_id=${config.client_id}&redirect_url=${config.redirect_url}`;
     * 
     */
    message.error('因国内网络环境,用户体验极差,github登录已暂时废弃',5);
  };

  componentDidMount() {
    // 检测本地是否有token
    this.testToken()
    /**
     *  
     * // giuhub登录暂时废弃，科学上网现在都进不去了
    const code = getQueryStringByName("code");
    if (code) {
      this.setState(
        {
          code: code,
        },
        () => {
          if (!this.state.code) {
            return;
          }
          this.getUser(this.state.code);
        }
      );
    }
     */


    /**
     * QQ登录
     */
  }

  /**
    *  getUser(code) {
        userGithubLogin({
          code: code,
        }).then((res) => {});
       }
   * 
   * 
   */

  testToken=()=>{
    console.log('33333333');
    console.log(getLocalStorage('token'))
    if(getLocalStorage('token').token && getLocalStorage('nackname').nackname&&getLocalStorage('user_id').user_id ){
      this.setState({
        btnIsShow:false
      });
    }
  }
}
