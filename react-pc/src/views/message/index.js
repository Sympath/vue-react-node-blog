import React from "react";
import { Avatar, Comment, Tooltip, Button, Input, message, Form } from "antd";
import dayjs from "dayjs";
import "../../assets/style/pages/leave-message.scss";
import { getLocalStorage } from "../../utils/local-storage";
import {
  postMessage,
  getMessage,
  deleteMessage,
  replyMessage,
} from "../../api/api";

const { TextArea } = Input;

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      message_txt: "",
      message_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      comments: [],
      isShow: 9999999,
      secend_message_txt: "",
      secend_create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      second_nackname: "",
      secend_message_content: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="leave-message">
        <div className="textarea-bar">
          <div className="textarea">
            <h2>给我留言</h2>
            <TextArea
              className="comment-textarea"
              placeholder="说点什么吧！"
              rows={5}
              name="message_txt"
              value={this.state.message_txt}
              onChange={this.handleChange}
            />
            <Button
              className="comment-btn"
              type="primary"
              onClick={this.sendMessage}
            >
              发 送
            </Button>
          </div>
        </div>
        <div className="messages">
          {this.state.comments.map((v, i) => {
            return (
              <div>
                {/* 一级评论 */}
                <Comment
                  className="message"
                  actions={[
                    <span
                      onClick={() => {
                        this._reply(i);
                      }}
                      key="comment-nested-reply-to"
                    >
                      回复
                    </span>,
                    <span
                      key="comment-nested-reply-to"
                      onClick={() => {
                        this.removeMessage(v._id);
                      }}
                    >
                      删除
                    </span>,
                  ]}
                  author={
                    <a>
                      <span style={{ fontWeight: "700", color: "#000" }}>
                        {v.nackname}
                      </span>
                    </a>
                  }
                  avatar={<Avatar size={40}>{v.nackname}</Avatar>}
                  content={<p>{v.message_txt}</p>}
                  datetime={
                    <Tooltip title={v.message_time}>
                      <span style={{ color: "#000" }}>{v.message_time}</span>
                    </Tooltip>
                  }
                ></Comment>
                {/* 二级评论 */}
                {v.second_message.map((value, index) => {
                  return (
                    <Comment
                      className="secend-message"
                      actions={[
                        <span
                          onClick={() => {
                            this._reply(
                              i,
                              value.nackname,
                              value.secend_message_txt
                            );
                          }}
                          key="comment-nested-reply-to"
                        >
                          回复
                        </span>,
                      ]}
                      author={
                        <a>
                          <span style={{ fontWeight: "700", color: "#000" }}>
                            {value.nackname}
                          </span>{" "}
                          回复{" "}
                          <span style={{ fontWeight: "600", color: "#000" }}>
                            {value.first_nackname}
                          </span>{" "}
                          {value.last_content
                            ? "(" + value.last_content + ")"
                            : ""}
                        </a>
                      }
                      avatar={<Avatar size={40}>{value.nackname}</Avatar>}
                      content={<p>{value.secend_message_txt}</p>}
                      datetime={
                        <Tooltip title={value.secend_create_time}>
                          <span style={{ color: "#000" }}>
                            {value.secend_create_time}
                          </span>
                        </Tooltip>
                      }
                    ></Comment>
                  );
                })}

                {/* 回复框 */}
                <Comment
                  className="message-input"
                  style={{ display: this.state.isShow == i ? "block" : "none" }}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <div>
                      <Form.Item>
                        <TextArea
                          placeholder="说点什么吧"
                          name="secend_message_txt"
                          value={this.state.secend_message_txt}
                          onChange={this.handleChange}
                          rows={4}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          type="primary"
                          onClick={() => {
                            this.clickReply(v._id, v.nackname);
                          }}
                        >
                          回复留言
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          htmlType="submit"
                          onClick={() => {
                            this.cancelReply();
                          }}
                          type="primary"
                        >
                          取消回复
                        </Button>
                      </Form.Item>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
        <div style={{ height: "200px" }}></div>
      </div>
    );
  }

  componentDidMount() {
    // 获取文章详情
    this.init();
  }

  // 实现双向
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // 提交留言
  sendMessage = () => {
    if (getLocalStorage("user_id").user_id) {
      postMessage({
        userId: getLocalStorage("user_id").user_id,
        message_txt: this.state.message_txt,
        message_time: this.state.message_time,
      }).then((res) => {
        message.success(res.data.message);
        this.setState({
          message_txt: "",
        });
        this.init();
      });
    } else {
      message.warning("请登录后留言哦");
    }
  };

  // 删除自己的留言
  removeMessage(id) {
    console.log(id, 333);
    deleteMessage({
      id: id,
      user_id: getLocalStorage("user_id").user_id,
    }).then((res) => {
      console.log(res);
      message.success(res.data.message);
      this.init();
    });
  }

  // 获取留言
  init() {
    getMessage().then((res) => {
      this.setState({
        comments: res.data,
      });
    });
  }

  // 弹出回复留言
  _reply(i, nackname, content) {
    this.setState({
      isShow: i,
      second_nackname: nackname,
      secend_message_content: content,
    });
  }

  // 取消回复，回复留言框消失
  cancelReply() {
    this.setState({
      isShow: 999999999999,
    });
  }

  // 点击回复留言按钮
  clickReply(id, nackname) {
    if (this.state.second_nackname) {
      replyMessage({
        id: id, //评论id
        nackname: this.state.second_nackname, //二级评论人的昵称
        content: this.state.secend_message_content, //二级评论人的昵称
        user_id: getLocalStorage("user_id").user_id, //三级回复人的id
        secend_message_txt: this.state.secend_message_txt, //三级回复人的评论
        secend_create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"), //三级回复人的评论时间
      }).then((res) => {
        message.success(res.data.message);
        this.setState({
          secend_message_txt: "",
          isShow: 9999999999999999,
          second_nackname: "",
          secend_message_content: "",
        });
        this.init();
      });
    } else {
      replyMessage({
        id: id, //评论id
        nackname: nackname, //一级评论人的姓名
        user_id: getLocalStorage("user_id").user_id, //二级评论人的id
        secend_message_txt: this.state.secend_message_txt, //二级评论人的评论
        secend_create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"), //二级评论人的评论时间
      }).then((res) => {
        message.success(res.data.message);
        this.setState({
          secend_message_txt: "",
          isShow: 9999999999999999,
        });
        this.init();
      });
    }
  }
}
