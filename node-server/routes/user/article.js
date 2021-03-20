"use strict";

import express from "express";
import Article from "../../controller/user/article";

const router = express.Router();

// 前端获取文章列表
router.get("/article/recommend", Article.userRecommendArticleList);
router.get("/article/list", Article.userArticleList);
router.get("/article/find", Article.userGetArticle);
router.post("/article/read", Article.userPostArticleRead);
router.post("/article/like", Article.userPostArticleLike);
router.post("/article/comment", Article.userPostArticleComment);
router.delete("/article/comment", Article.userRemoveArticleComment);


export default router;
