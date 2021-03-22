import React from "react";
import { getWebsiteContent } from "../../api/api";
import "../../assets/style/pages/about-website.scss";

export default class Website extends React.Component {
  constructor(){
    super()
    this.state={
      isLoading:false,
      introduce:''
    }
  }
  render() {
    return <>
        <div className="about-website">
          <div
                className="exprence"
                dangerouslySetInnerHTML={{
                  __html: this.state.introduce,
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
    getWebsiteContent().then((res) => {
      console.log(res.data);
      this.setState({
        introduce: res.data.introduce,
        isLoading:false
      });
    });
  }
}
