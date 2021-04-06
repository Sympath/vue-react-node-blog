"use strict";
// 七牛云
var uploadRouter = require('../utils/upload/qiniu');

// 后台管理系统路由引入
import adminLogin from "./admin/login";
import adminEchart from "./admin/echart";
import adminPersonal from "./admin/personal";
import adminPublish from "./admin/publish";
import adminArticle from "./admin/article";
import adminProject from "./admin/project";
import adminLink from "./admin/link";
import adminUser from "./admin/user";
import adminMessage from "./admin/comment";
import adminComment from "./admin/message";
import adminBlog from "./admin/blog";
import Check from "../middlewares/check";

// PC和H5前端引入
import userLogin from "./user/login";
import userBloggerInfor from "./user/blogger";
import userLink from "./user/link";
import userDictionary from "./user/dictionary";
import userArticle from "./user/article";
import userProject from "./user/project";
import userWebsite from "./user/website";
import userMessage from "./user/message";





export default (app) => {
    // 七牛云存储
    app.use('/upload', uploadRouter);

    //后台管理系统
    app.use("/admin", adminLogin);
    app.use("/admin",Check.checkToken, adminPersonal);  // token验证
    app.use("/admin", adminEchart);
    app.use("/admin", adminPublish);
    app.use("/admin",adminArticle);
    app.use("/admin", adminProject);
    app.use("/admin", adminLink);
    app.use("/admin", adminUser);
    app.use("/admin", adminMessage);
    app.use("/admin", adminComment);
    app.use("/admin", adminBlog);

    // pc/h5 用户前端
    app.use("/user", userLogin);
    app.use("/user", userBloggerInfor);
    app.use("/user", userLink);
    app.use("/user", userDictionary);
    app.use('/user', userArticle);
    app.use('/user', userProject);
    app.use('/user', userWebsite);
    app.use('/user', userMessage);
    
  };
  