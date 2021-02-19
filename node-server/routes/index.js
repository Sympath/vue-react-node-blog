"use strict";

import login from "./admin/login";
import personal from "./admin/personal";
import publish from "./admin/publish";
import article from "./admin/article";
export default (app) => {
    //后台管理系统
    app.use("/admin", login);
    app.use("/admin", personal);
    app.use("/admin", publish);
    app.use("/admin", article);
  };
  