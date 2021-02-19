"use strict";

import express from "express";
import Publish from "../../controller/admin/publish";

const router = express.Router();


// 后台管理系统(公告管理)
router.post("/publish/notice", Publish.adminPostPublishNotice);
router.get("/publish/notice", Publish.adminGetPublishNotice);




export default router;
