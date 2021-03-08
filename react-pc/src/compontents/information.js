import { Divider } from "antd";
import "../assets/style/home.scss";
import avatar from "../assets/images/avatar.jpg";

export default function Information() {
  return (
    <div className="information">
      <Divider>简介</Divider>
      <img src={avatar} alt="头像" />
      <h1>fujinting</h1>
      <div className="infor-content">一只js菜鸡</div>
      <div className="product-nums">
        <span>
          <div>20</div>
          <div>标签</div>
        </span>
        <span>
          <div>100</div>
          <div>文章</div>
        </span>
        <span className="infor-project">
          <div>100</div>
          <div>项目</div>
        </span>
      </div>
      <div className="infor-other">

      </div>
    </div>
  );
}
