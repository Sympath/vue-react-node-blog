"use strict";

import express from "express";
import Article from "../../controller/admin/article";

const router = express.Router();

// 后台管理系统(博文管理,获取/修改PC以及H5的文章分类)
router.get("/article/type", Article.adminGetArticleType);
router.post("/article/type", Article.adminEditArticleType);
// 后台管理系统(博文管理,获取/修改PC以及H5的文章分类)
router.post("/article/create", Article.adminCreateArticle);
router.get("/article/create", Article.adminCreateArticle);

export default router;
