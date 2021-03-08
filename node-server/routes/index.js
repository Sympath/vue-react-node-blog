"use strict";


import login from "./admin/login";
import personal from "./admin/personal";
import publish from "./admin/publish";
import article from "./admin/article";
import project from "./admin/project";
import link from "./admin/link";
import Check from "../middlewares/check";

// 七牛云
var uploadRouter = require('../utils/upload/qiniu');

export default (app) => {
    // 七牛云存储
    app.use('/upload', uploadRouter);

    //后台管理系统
    app.use("/admin", login);
    app.use("/admin",Check.checkToken, personal);  // token验证
    app.use("/admin", publish);
    app.use("/admin",article);
    app.use("/admin", project);
    app.use("/admin", link);
    
  };
  