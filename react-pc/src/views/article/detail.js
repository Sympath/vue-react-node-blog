import React from "react";
import { Input, Button, Avatar, Comment } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import "../../assets/style/pages/article-detail.scss";
import "mavon-editor/dist/css/index.css";
import { getArticle, postArticleRead, postArticleLike ,postArticleComment} from "../../api/api";
import {getLocalStorage} from '../../utils/local-storage'

const { TextArea } = Input;

export default class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      articleContent: "",
      commentTxt:''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <>
        <div className="article-detail">
          <h2 className="title">{this.state.detail.title}</h2>
          <div className="auther-time-read">
            <span>作者：{this.state.detail.author}</span>
            <span>创作时间：{this.state.detail.create_time}</span>
            <span>阅读：{this.state.detail.read}</span>
          </div>
          <div className="content">
            <div
              className="markdown-body article-content"
              dangerouslySetInnerHTML={{
                __html: this.state.detail.html,
              }}
            />
          </div>
          <div className="like-bar">
            <div
              onClick={() => {
                this._like();
              }}
            >
              <LikeOutlined className="like-icon" />
              点赞({this.state.detail.like})
            </div>
          </div>
          <div className="textarea-bar">
            <div className="textarea">
              <h2>评论一下</h2>
              <TextArea
                className="comment-textarea"
                placeholder="说点什么吧！"
                rows={5}
                name="commentTxt"
                value={this.state.commentTxt}
                onChange={this.handleChange}
              />
              <Button className="comment-btn" type="primary" onClick={this.sendComment}>
                发 送
              </Button>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              {/* 评论 */}

              <Comment
                actions={[<span key="comment-nested-reply-to">回复</span>]}
                author={<a>付金廷</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    我们提供一系列的设计原则，实用的模式和高质量的设计资源(素描和Axure)。
                  </p>
                }
              >
              </Comment>
            </div>
          </div>

          <div className="other"></div>
        </div>
      </>
    );
  }

  componentDidMount() {
    // 获取文章详情
    this.init();
    // 获取阅读量
    this.postRead();
  }
  postRead() {
    postArticleRead({
      id: this.props.match.params.id,
    }).then((res) => {
      this.setState({
        detail: res.data.article,
      });
    });
  }
  init() {
    getArticle({
      id: this.props.match.params.id,
    }).then((res) => {
      this.setState({
        detail: res.data.article,
      });
    });
  }
  _like() {
    postArticleLike({
      id: this.props.match.params.id,
    }).then((res) => {
      this.setState({
        detail: res.data.article,
      });
      console.log(res);
    });
  }
  // 评论输入框双向绑定
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  // 发送评论
  sendComment=()=>{
    postArticleComment({
      articleId:this.props.match.params.id,
      userId:getLocalStorage('user_id').user_id,
      commentTxt:this.state.commentTxt
    }).then(res=>{
      console.log(res);
    })
  }
}
