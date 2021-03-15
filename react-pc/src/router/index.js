import React from "react"; //** 引入 支持jsx语法

//** 将HashRouter引入并简化为router,将Route引入
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//** 引入组件
import Recommend from "../views/recommend";
import Article from "../views/article";
import Project from "../views/project";
import Message from "../views/message";
import Website from "../views/website";
import Blogger from "../views/blogger";

import ArticleDetail from '../views/article/detail'

//固定格式
export default function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/recommend" component={Recommend}></Route>
        <Route path="/article" component={Article}></Route>
        <Route path="/project" component={Project}></Route>
        <Route path="/message" component={Message}></Route>
        <Route path="/website" component={Website}></Route>
        <Route path="/blogger" component={Blogger}></Route>

        <Route path="/detail/article/:id" component={ArticleDetail}></Route>
      </Switch>
    </Router>
  );
}
