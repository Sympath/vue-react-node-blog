import React from "react";
import { getBloggerContent } from "../../api/api";
import "../../assets/style/pages/about-blogger.scss";

export default class Blogger extends React.Component {
  constructor(){
    super()
    this.state={
      isLoading:false,
      experience:''
    }
  }
  render() {
    return <>
        <div className="about-blogger">
          <div
                className="exprence"
                dangerouslySetInnerHTML={{
                  __html: this.state.experience,
                }}
              />
              <div className="other"></div>
        </div>
    
    </>;
  }
  componentWillMount() {
    this.init();
  }
  init(){
    this.setState({
      isLoading:true
    });
    getBloggerContent().then((res) => {
      console.log(res.data);
      this.setState({
        experience: res.data.experience,
        isLoading:false
      });
    });
  }
}
