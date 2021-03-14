"use strict";
// 七牛云
var uploadRouter = require('../utils/upload/qiniu');

// 后台管理系统路由引入
import adminLogin from "./admin/login";
import adminPersonal from "./admin/personal";
import adminPublish from "./admin/publish";
import adminArticle from "./admin/article";
import adminProject from "./admin/project";
import adminLink from "./admin/link";
import Check from "../middlewares/check";

// PC和H5前端引入
import userLogin from "./user/login";
import userBloggerInfor from "./user/blogger";
import userDictionary from "./user/dictionary";
import userArticle from "./user/article";



export default (app) => {
    // 七牛云存储
    app.use('/upload', uploadRouter);

    //后台管理系统
    app.use("/admin", adminLogin);
    app.use("/admin",Check.checkToken, adminPersonal);  // token验证
    app.use("/admin", adminPublish);
    app.use("/admin",adminArticle);
    app.use("/admin", adminProject);
    app.use("/admin", adminLink);

    // pc/h5 用户前端
    app.use("/user", userLogin);
    app.use("/user", userBloggerInfor);
    app.use("/user", userDictionary);
    app.use('/user', userArticle)
    
  };
  