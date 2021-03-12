import React from "react";
import '../../assets/style/recommend.scss'
import {userLogin} from '../../api/api'
export default class Recommend extends React.Component{
    render() {
        return (
          <div className="recommend">
            推荐
          </div>
        );
      }
      componentWillMount(){
        this.openNotification()
      }
      openNotification = () => {
        userLogin().then(res=>{
          console.log(res);
        })
      };
}
