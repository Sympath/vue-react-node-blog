import React from "react";
import { Avatar, Comment, Tooltip, Button, Input, message } from "antd";
import dayjs from "dayjs";
import "../../assets/style/pages/leave-message.scss";
import { getLocalStorage } from "../../utils/local-storage";
import { postMessage ,getMessage} from "../../api/api";

const { TextArea } = Input;

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      message_txt: "",
      message_time:dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      comments: [],
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
              <Comment
                className="message"
                actions={[
                  <span onClick={this._reply} key="comment-nested-reply-to">
                    回复
                  </span>,
                  <span key="comment-nested-reply-to">删除</span>,
                ]}
                author={<a>{v.nackname}</a>}
                avatar={<Avatar size={40}>{v.nackname}</Avatar>}
                content={<p>{v.message_txt}</p>}
                datetime={
                  <Tooltip title={v.message_time}>
                    <span>{v.message_time}</span>
                  </Tooltip>
                }
              ></Comment>
            );
          })}
        </div>
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
  };

  // 获取留言
  init(){
    getMessage().then(res=>{
      this.setState({
        comments:res.data
      })
    })
  }
}
