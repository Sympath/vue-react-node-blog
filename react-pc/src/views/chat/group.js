import React from "react";

export default class GroupChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="group-chat">这是群聊页面,可以与博主等其他用户在线聊天</div>
    );
  }
}
