"use strict";

import express from "express";
import Article from "../../controller/user/article";

const router = express.Router();

// 前端获取文章列表

router.get("/article/list", Article.userArticleList);
router.get("/article/find", Article.userGetArticle);
router.post("/article/read", Article.userPostArticleRead);
router.post("/article/like", Article.userPostArticleLike);


export default router;
