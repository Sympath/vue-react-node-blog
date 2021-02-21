"use strict";

import express from "express";
import Project from "../../controller/admin/project";

const router = express.Router();


// 后台管理系统(项目管理,创建/编辑/获取 PC以及H5的项目/项目列表)
router.post("/project/create", Project.adminCreateProject);
router.get("/project/find", Project.adminGetProject);
router.get("/project/recent", Project.adminGetRecentProject);
router.delete("/project/delete", Project.adminDeleteProject);
router.put("/project/edit", Project.adminEditProject);
router.get("/project/list", Project.adminProjectList);

export default router;
