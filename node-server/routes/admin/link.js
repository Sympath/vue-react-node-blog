"use strict";

import express from "express";
import Link from "../../controller/admin/link";

const router = express.Router();


// 后台管理系统(公告管理)
router.post("/link/create", Link.adminLinkCreate);
router.get("/link/list", Link.adminLinkList);
router.delete("/link/delete", Link.adminLinkDelete);
router.put("/link/edit", Link.adminEditLink);




export default router;
