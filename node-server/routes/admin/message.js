"use strict";

import express from "express";
import Message from "../../controller/admin/message";

const router = express.Router();

// 后台管理系统(获取用户留言)
router.get("/message/list", Message.adminMessageList);
// 后台管理系统(删除指定用户留言)
router.delete("/message/delete", Message.adminMessageDelete);

export default router;
