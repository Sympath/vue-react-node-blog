"use strict";

import express from "express";
import Link from "../../controller/user/link";

const router = express.Router();


// 用户端
router.get("/link/list", Link.userLinkList);

export default router;
