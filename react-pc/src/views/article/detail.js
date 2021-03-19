import React from "react";
import { Input, Button, Avatar, Comment ,Tooltip,message} from "antd";
import dayjs from "dayjs";
import moment from 'moment';
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
      detail: {
        comments:[]
      },
      articleContent: "",
      comment_txt:'',
      comment_time:dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
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
                name="comment_txt"
                value={this.state.comment_txt}
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
              {
                this.state.detail.comments.map((v,i)=>{
                  return (  
                    <Comment
                    actions={[<span key="comment-nested-reply-to">回复</span>]}
                    author={<a>{v.nackname}</a>}
                    avatar={
                      <Avatar size={40}>{v.nackname}</Avatar>
                     
                    }
                    content={
                      <p>
                        {v.comment_txt}
                      </p>
                    }
                    datetime={<Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                  </Tooltip>}
                  >
                  </Comment>
                  )
                })
              }

              
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
      comment_txt:this.state.comment_txt,
      comment_time:this.state.comment_time,
    }).then(res=>{
      message.success(res.data.message);
      this.setState({
        comment_txt: '',
      });
      this.init();
    })
  }
}
