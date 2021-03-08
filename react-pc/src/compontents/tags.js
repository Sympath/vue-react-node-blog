import {Divider , Tag } from "antd";
import '../assets/style/home.scss'

export default function Tags() {
  return (
    <div className="tags">
        <Divider>标签云</Divider>
      <Tag className="tag" color="#f50">vue</Tag>
      <Tag  className="tag" color="#2db7f5">react</Tag>
      <Tag  className="tag" color="#87d068">webpack</Tag>
      <Tag   className="tag" color="#108ee9">node</Tag>

      <Tag className="tag" color="#f50">算法</Tag>
      <Tag  className="tag" color="#2db7f5">数据结构</Tag>
      <Tag  className="tag" color="#87d068">mysql</Tag>
      <Tag   className="tag" color="#108ee9">计算机网络</Tag>

      <Tag  className="tag" color="#2db7f5">mongodb</Tag>
      <Tag  className="tag" color="#87d068">express</Tag>
      <Tag   className="tag" color="#108ee9">elementUI</Tag>
      
    </div>
  );
}
