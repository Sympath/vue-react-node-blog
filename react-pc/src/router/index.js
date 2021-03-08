import React from "react"; //** 引入 支持jsx语法

//** 将HashRouter引入并简化为router,将Route引入
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//** 引入组件
import Recommend from "../views/recommend";
import About from "../views/about";

//固定格式
export default function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/recommend" component={Recommend}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </Router>
  );
}
