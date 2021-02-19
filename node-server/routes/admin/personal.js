"use strict";

import express from "express";
import Personal from "../../controller/admin/personal";

const router = express.Router();
const multer = require("multer");


// 后台管理系统(图片上传方法)
const upload = multer({ dest: __dirname + "/../../upload/admin" });
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3000/upload/admin/${file.filename}`;
  res.send(file);
});

// //静态文件托管
// router.get('/upload',express.static(__dirname+'/../../upload/admin'))  



// 后台管理系统(个人信息,获取PC以及H5的博主个人信息)
router.get("/personal/information", Personal.adminGetBloggerInfor);
router.post("/personal/information", Personal.adminEditBloggerInfor);
// 后台管理系统(个人信息,获取PC以及H5的博主个人标签)
router.post("/personal/label", Personal.adminEditBloggerLabel);
router.get("/personal/label", Personal.adminGetBloggerLabel);
// 后台管理系统(个人信息,获取PC以及H5的博主个人经历)
router.post("/personal/experience", Personal.adminEditBloggerExperience);
router.get("/personal/experience", Personal.adminGetBloggerExperience);



export default router;
