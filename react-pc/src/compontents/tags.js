import { useState } from 'react'
import { Divider,Tag } from "antd";
import "../assets/style/compontents/tags.scss";

export default function Tags(props) {
  const [ colors ] = useState(['#f50','#2db7f5','#87d068','#108ee9','#55acee','#3b5999','red','green','blue','purple'])
  const [colorss]  = useState(['red','green','blue','purple','magenta','volcano','orange','gold','geekblue','cyan'])
  return (
    <div className="tags">
      <Divider>技能标签</Divider>
      {props.bloggerInfor.label.map((item,index) => {
        
        return (
          <Tag className="tag" color={colors[Math.floor(Math.random()*10)]} key={index}>
            {item}
          </Tag>
        );
      })}

    <Divider style={{marginTop:'120px'}}>友情链接</Divider>
      {props.bloggerInfor.label.map((item,index) => {
        
        return (
          <Tag className="tag" color={colorss[Math.floor(Math.random()*10)]} key={index}>
           刘强东的博客
          </Tag>
        );
      })}
    </div>
  );
}
