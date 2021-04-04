"use strict";

import express from "express";
import User from "../../controller/admin/user";

const router = express.Router();






// 后台管理系统(获取用户列表)
router.get("/user/list", User.adminUserList);
// 后台管理系统(注销用户)
router.delete("/user/delete", User.adminUserDelete);



export default router;
