"use strict";

import express from "express";
import Article from "../../controller/admin/article";

const router = express.Router();

// 后台管理系统(博文管理,获取/修改PC以及H5的文章分类)
router.get("/article/type", Article.adminGetArticleType);
router.post("/article/type", Article.adminEditArticleType);
// 后台管理系统(博文管理,创建/编辑/获取 PC以及H5的文章/文章列表)
router.post("/article/create", Article.adminCreateArticle);
router.get("/article/find", Article.adminGetArticle);
router.get("/article/recent", Article.adminGetRecentArticle);
router.delete("/article/delete", Article.adminDeleteArticle);
router.put("/article/edit", Article.adminEditArticle);
router.get("/article/list", Article.adminArticleList);

export default router;
