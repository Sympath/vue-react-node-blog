"use strict";

import express from "express";
import Comment from "../../controller/admin/comment";

const router = express.Router();

// 后台管理系统(获取用户留言)
router.get("/comment/list", Comment.adminCommentList);
// 后台管理系统(删除指定用户留言)
router.delete("/comment/delete", Comment.adminCommentDelete);

export default router;
