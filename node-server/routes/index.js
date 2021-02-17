"use strict";

import login from "./admin/login";
import personal from "./admin/personal";
export default (app) => {
    //后台管理系统
    app.use("/admin", login);
    app.use("/admin", personal);
  };
  