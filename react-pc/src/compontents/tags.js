import { useState } from 'react'
import { Divider,Tag } from "antd";
import "../assets/style/compontents/tags.scss";

export default function Tags(props) {
  const [ colors ] = useState(['#f50','#2db7f5','#87d068','#108ee9','#55acee','#3b5999','red','green','blue','purple'])
  return (
    <div className="tags">
      <Divider>标签云</Divider>
      {props.bloggerInfor.label.map((item,index) => {
        
        return (
          <Tag className="tag" color={colors[Math.floor(Math.random()*10)]} key={index}>
            {item}
          </Tag>
        );
      })}
      
     
    </div>
  );
}
