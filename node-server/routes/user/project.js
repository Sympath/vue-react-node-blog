"use strict";

import express from "express";
import Project from "../../controller/user/project";

const router = express.Router();


// 后台管理系统(项目管理,创建/编辑/获取 PC以及H5的项目/项目列表)
router.get("/project/list", Project.userProjectList);

export default router;
