"use strict";

import express from "express";
import Blog from "../../controller/admin/blog";

const router = express.Router();






// 后台管理系统(博客介绍)
router.post("/blog/introduce", Blog.adminEditBlogIntroduce);
router.get("/blog/introduce", Blog.adminGetBlogIntroduce);



export default router;
