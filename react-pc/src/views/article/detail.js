import React from "react";
import "../../assets/style/pages/article-detail.scss";
import {getArticle} from '../../api/api'

export default class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail:{

      }
    };
  }
  render() {
    return (
      <>
        <div className="article-detail">
          <h2 className="title">
           {this.state.detail.title}
          </h2>
          <div className="auther-time-read">
            <span>作者：{this.state.detail.author}</span>
            <span>创作时间：{this.state.detail.create_time}</span>
            <span>阅读量：{this.state.detail.read}</span>
          </div>
          <div dangerouslySetInnerHTML = {{ __html:this.state.detail.article ? this.state.detail.article : null }}>

          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.history.push("/article");
    }else{
        console.log(this.props.match.params.id);
        getArticle({
            id:this.props.match.params.id
        }).then(res=>{
            this.setState({
              detail:res.data.article
            })
        })
    }
  }
}
